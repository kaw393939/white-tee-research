#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm run docs:build
repo_url="$(git remote get-url origin)"
author_name="$(git config user.name)"
author_email="$(git config user.email)"
source_commit="$(git rev-parse HEAD)"
deploy_dir="$(mktemp -d)"
trap 'rm -rf "$deploy_dir"' EXIT
git -C "$deploy_dir" init -q
git -C "$deploy_dir" remote add origin "$repo_url"
git -C "$deploy_dir" config user.name "$author_name"
git -C "$deploy_dir" config user.email "$author_email"
git -C "$deploy_dir" config credential.helper '!gh auth git-credential'
if git -C "$deploy_dir" ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
  git -C "$deploy_dir" fetch --depth=1 origin gh-pages
  git -C "$deploy_dir" checkout -b gh-pages FETCH_HEAD
  git -C "$deploy_dir" rm -r --ignore-unmatch .
else
  git -C "$deploy_dir" checkout --orphan gh-pages
fi
cp -R docs/.vitepress/dist/. "$deploy_dir/"
touch "$deploy_dir/.nojekyll"
git -C "$deploy_dir" add --all
if git -C "$deploy_dir" diff --cached --quiet; then
  echo 'Published build already matches.'
else
  git -C "$deploy_dir" commit -m "Publish research hub from $source_commit"
  git -C "$deploy_dir" push origin gh-pages
fi
