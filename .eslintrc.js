module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-native/no-inline-styles': 0,
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
  },
};
