#!/usr/bin/env node
const { main } = require('./src/main');

(async () => {
  await main(__dirname); // since we want the path of the script dir
})();
