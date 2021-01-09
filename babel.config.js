const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      alias: {
        '@assets': './src/assets',
        '@types': './src/types',
        '@components': './src/components',
        '@utils': './src/utils',
        '@navigation': './src/navigation',
        '@screens': './src/screens',
        '@services': './src/services',
        '@stores': './src/stores',
      },
    },
  ],
  'react-native-reanimated/plugin',
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins,
};
