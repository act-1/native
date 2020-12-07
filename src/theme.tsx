import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  redPrimary: '#E03616',

  orange: '#FFC281',
  orangeDark: '#632700',

  white: '#fff',
  porcelain: '#F0F2F3',
  lightgrey: '#f0f2f5',
  grey: '#737373',
  black: '#0B0B0B',
};

const theme = createTheme({
  colors: {
    primaryText: palette.black,
    lightText: palette.grey,
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.purplePrimary,
    eventBoxDateColor: palette.redPrimary,
    dimmedBackground: palette.lightgrey,
    attentionBackground: palette.orange,
    attentionForeground: palette.orangeDark,
    lightBorderColor: palette.lightgrey,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    xm: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    hugeTitle: {
      fontFamily: 'Rubik-Bold',
      fontSize: 28,
      color: 'primaryText',
    },
    largeTitle: {
      fontFamily: 'Rubik-Bold',
      fontSize: 20,
      color: 'primaryText',
      textAlign: 'left',
    },
    text: {
      fontFamily: 'Rubik-Regular',
      fontSize: 14,
      color: 'primaryText',
    },
    eventBoxTitle: {
      fontFamily: 'Rubik-Bold',
      fontSize: 16,
      color: 'primaryText',
    },
    eventBoxDate: {
      fontFamily: 'Rubik-Medium',
      fontSize: 13,
      color: 'eventBoxDateColor',
    },
    eventBoxLocation: {
      fontFamily: 'Rubik-Regular',
      fontSize: 15,
      color: 'lightText',
    },
    buttonText: {
      fontFamily: 'Rubik-Bold',
      fontSize: 18,
    },
  },
});

export type Theme = typeof theme;
export default theme;
