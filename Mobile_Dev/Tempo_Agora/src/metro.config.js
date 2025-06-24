const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude development packages from web bundle
config.resolver.blockList = [
  /node_modules\/@typescript-eslint\/.*/,
  /node_modules\/knip\/.*/,
  /node_modules\/typescript-eslint\/.*/,
  /node_modules\/eslint\/.*/,
  /node_modules\/ts-api-utils\/.*/,
];

module.exports = config;