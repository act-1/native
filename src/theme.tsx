import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#6E7DFF',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  redLight: '#ffe7e5',
  redPrimary: '#f0040d',

  orange: '#FFC281',
  orangeDark: '#632700',

  blue: '#0078F8',

  white: '#fff',
  porcelain: '#F0F2F3',
  lightgrey: '#f0f2f5',
  grey: '#737373',
  metal: '#2d3436',
  black: '#040506',
};

const theme = createTheme({
  colors: {
    primaryText: palette.black,
    subText: palette.metal,
    lightText: palette.grey,
    mainBackground: palette.white,
    mainForeground: palette.black,
    eventBoxDateColor: palette.redPrimary,
    dimmedBackground: palette.lightgrey,
    important: palette.redPrimary,
    importantLight: palette.redLight,
    attentionBackground: palette.orange,
    attentionForeground: palette.orangeDark,
    screenTitle: palette.purpleLight,
    lightBorderColor: palette.lightgrey,
    seperator: palette.porcelain,
    link: palette.blue,
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
      fontSize: 30,
      color: 'primaryText',
      textAlign: 'left',
    },
    extraLargeTitle: {
      fontFamily: 'Rubik-Bold',
      fontSize: 26,
      color: 'primaryText',
      textAlign: 'left',
    },
    largeTitle: {
      fontFamily: 'Rubik-Bold',
      fontSize: 20,
      color: 'primaryText',
      textAlign: 'left',
    },
    text: {
      fontFamily: 'Rubik-Regular',
      fontSize: 16,
      color: 'primaryText',
      textAlign: 'left',
    },
    smallText: {
      fontFamily: 'Rubik-Regular',
      fontSize: 14,
      color: 'primaryText',
      textAlign: 'left',
    },
    boxTitle: {
      fontFamily: 'Rubik-Bold',
      fontSize: 16,
      color: 'primaryText',
    },
    boxInfo: {
      fontFamily: 'Rubik-Medium',
      fontSize: 13,
      color: 'eventBoxDateColor',
    },
    boxSubtitle: {
      fontFamily: 'Rubik-Regular',
      fontSize: 15,
      color: 'lightText',
    },
    appLink: {
      fontFamily: 'Rubik-Medium',
      fontSize: 15,
      color: 'link',
    },
    roundedButtonText: {
      fontFamily: 'Rubik-Bold',
      fontSize: 16,
    },
    circularButtonText: {
      fontFamily: 'Rubik-Medium',
      fontSize: 13,
    },
    importantText: {
      fontFamily: 'Rubik-Bold',
      fontSize: 16,
      color: 'important',
      textAlign: 'left',
    },
  },
});

export type Theme = typeof theme;
export default theme;
