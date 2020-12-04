import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  redPrimary: '#E03616',

  black: '#0B0B0B',
  white: '#F0F2F3',
  grey: '#737373',
};

const theme = createTheme({
  colors: {
    primaryText: palette.black,
    lightText: palette.grey,
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    eventBoxDateColor: palette.redPrimary,
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
    largeTitle: {
      fontFamily: 'Rubik-Bold',
      fontSize: 24,
      color: 'primaryText',
    },
    eventBoxTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'primaryText',
    },
    eventBoxDate: {
      fontWeight: 'bold',
      fontSize: 13,
      color: 'eventBoxDateColor',
    },
    eventBoxLocation: {
      fontWeight: '100',
      fontSize: 15,
      color: 'lightText',
    },
  },
});

export type Theme = typeof theme;
export default theme;
