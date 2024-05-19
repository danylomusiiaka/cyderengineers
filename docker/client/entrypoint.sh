#!/bin/bash
set -ex

npm install
if [[ ! -z "$NODE_ENV" ]] && [[ $NODE_ENV == "dev" ]];
then
    npm run dev -- --host
else
    npm run build
    serve -s dist -p 5173
fi
