"""Generate the ASKET pilot locally; publish only the MP3 and matching transcript."""
import hashlib
import json
import os
from pathlib import Path
import subprocess
import tempfile

import numpy as np
import soundfile as sf
from kokoro import KPipeline

ROOT = Path(__file__).resolve().parent.parent
VOICE = os.environ.get('KOKORO_VOICE', 'af_heart')
TARGET_SECONDS = 60
transcript = (ROOT / 'audio/asket-summary.txt').read_text().strip()
# CPU is portable and avoids MPS-specific operator limitations.
pipeline = KPipeline(lang_code='a', repo_id='hexgrad/Kokoro-82M', device='cpu')
chunks = [result.audio.numpy() for result in pipeline(transcript, voice=VOICE, speed=1)]
if not chunks:
    raise RuntimeError('Kokoro returned no audio')
wave = np.concatenate(chunks)
duration = len(wave) / 24000
pace = duration / TARGET_SECONDS
if not 0.8 <= pace <= 1.2:
    raise RuntimeError(f'Natural duration is {duration:.1f}s. Revise the script toward 60 seconds before publishing.')
with tempfile.TemporaryDirectory(prefix='white-tee-kokoro-') as tmp:
    wav, mp3 = Path(tmp) / 'brief.wav', Path(tmp) / 'brief.mp3'
    sf.write(wav, wave, 24000)
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(wav),
                    '-af', f'atempo={pace:.8f},loudnorm=I=-16:TP=-1.5:LRA=11',
                    '-ar', '24000', '-codec:a', 'libmp3lame', '-b:a', '128k', str(mp3)], check=True)
    actual = float(subprocess.check_output(['ffprobe', '-v', 'quiet', '-show_entries',
                 'format=duration', '-of', 'csv=p=0', str(mp3)], text=True).strip())
    if abs(actual - TARGET_SECONDS) > 0.5:
        raise RuntimeError(f'Unexpected final duration: {actual}')
    data = mp3.read_bytes()
    # Content version prevents browsers from replaying the old cached narration.
    digest = hashlib.sha256(data).hexdigest()[:12]
    (ROOT / 'docs/public/audio/asket.mp3').write_bytes(data)
    manifest_path = ROOT / 'docs/.vitepress/theme/audio.generated.json'
    manifest = json.loads(manifest_path.read_text())
    manifest['asket'] = dict(title='Listen to the 60-second ASKET brief',
        file=f'/audio/asket.mp3?v={digest}', duration=round(actual), transcript=transcript,
        engine='kokoro', voice=VOICE, source='audio/asket-summary.txt')
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    print(f'Generated ASKET: {actual:.2f}s, voice {VOICE}, natural duration {duration:.2f}s.')
