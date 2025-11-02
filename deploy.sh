#!/bin/bash
export PATH="/Users/amanuelzegeye/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
cd "$(dirname "$0")"
exec /usr/local/bin/node node_modules/.bin/sst deploy "$@"
