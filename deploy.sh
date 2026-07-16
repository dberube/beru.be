#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
git fetch origin main
old="$(git rev-parse HEAD 2>/dev/null || true)"
new="$(git rev-parse origin/main)"
if [ "$old" = "$new" ]; then
  echo "Already current: $old"
  exit 0
fi
git pull --ff-only origin main
npm ci --omit=dev
npm run build
cat <<'NOTE'
Build complete. Point Caddy at this repo's dist/ directory, for example:

beru.be, www.beru.be {
  root * /home/hermes/development/beru.be/dist
  file_server
}

Timer example:
  */5 * * * * /home/hermes/development/beru.be/deploy.sh >> /var/log/berube-deploy.log 2>&1
NOTE
