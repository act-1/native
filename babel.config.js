const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      alias: {
        '@assets': './src/assets',
        '@types': './src/types',
        '@components': './src/components',
        _navigation: './src/navigation',
        _screens: './src/screens',
      },
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins,
};
