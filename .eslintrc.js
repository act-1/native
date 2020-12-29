module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-native/no-inline-styles': 0,
    curly: ['error', 'multi-line'],
    'capitalized-comments': [
      'error',
      'always',
      {
        ignorePattern: 'import|export|const|if|useEffect',
        ignoreConsecutiveComments: true,
      },
    ],
    'spaced-comment': ['error', 'always', { exceptions: ['*'], markers: ['*'] }],
    'keyword-spacing': ['error', { before: true }],
    'import/no-duplicates': ['error'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
