#!/bin/bash
# install dependencies
bun install
# build
bun run build
# archive to zip
zip -r codequest.zip css/ icon/ content.js manifest.json
