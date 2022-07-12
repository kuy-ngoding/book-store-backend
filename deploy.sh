#!/usr/bin/env sh
# install dependencies
echo "installing dependecies... "
yarn install

# build
echo "building... "
yarn build

# PM2 restart ecosystem.config.js
echo "restart pm2 services... "
pm2 restart ecosystem.config.js

echo "done... "
