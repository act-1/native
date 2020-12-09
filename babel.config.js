const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      alias: {
        '@types': './src/types',
        _components: './components',
        _navigation: './navigation',
        _screens: './screens',
      },
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins,
};
