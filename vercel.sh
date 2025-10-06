#!/bin/bash
set -e

if [[ $VERCEL_GIT_COMMIT_REF == "main" || $VERCEL_GIT_COMMIT_REF == "master" ]]; then
  echo "🚀 Building production SSR..."
  npm run build:ssr
else
  echo "🧪 Building staging SSR..."
  npm run build:staging-ssr
fi
