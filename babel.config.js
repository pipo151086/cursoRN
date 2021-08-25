module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ['babel-plugin-root-import',
      {
        "paths": [
          {
            rootPathPrefix: '~/',
            rootPathSuffix: './src/theme/appStyle/',
          },
          {
            rootPathPrefix: '@/',
            rootPathSuffix: './src/',
          },
          {
            rootPathPrefix: '!/',
            rootPathSuffix: './assets/',
          }
        ]
      }
    ],
  ]
};
