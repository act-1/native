import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#6E7DFF',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  redLight: '#ffe7e5',
  redPrimary: '#eb524b',

  orange: '#FFC281',
  orangeDark: '#632700',

  yellow: '#FFCB00',

  turquoise: '#76C6CB',
  blue: '#0078F8',

  white: '#fafafa',
  barleyWhite: '#ededed',
  lightgrey: '#f0f2f5',
  grey: '#737373',
  metal: '#222222',
  heavyMetal: '#111111',
  black: '#040506',
};

const theme = createTheme({
  colors: {
    primaryText: palette.white,
    subText: palette.grey,
    lightText: palette.barleyWhite,
    headerTitle: palette.redPrimary,
    mainBackground: palette.black,
    mainForeground: palette.white,
    greyBackground: palette.heavyMetal,
    lightBackground: palette.lightgrey,
    eventBoxDateColor: palette.redPrimary,
    boxTitle: palette.turquoise,
    dimmedBackground: palette.lightgrey,
    sectionListSeperator: palette.heavyMetal,
    important: palette.redPrimary,
    importantLight: palette.redLight,
    attentionBackground: palette.orange,
    attentionForeground: palette.orangeDark,
    onBoardingBackground: palette.purpleLight,
    screenTitle: palette.purpleLight,
    lightBorderColor: palette.lightgrey,
    seperator: palette.metal,
    link: palette.blue,
    yellow: palette.yellow,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 12,
    xm: 16,
    l: 24,
    xl: 40,
    xxl: 48,
  },
  breakpoints: {
    phone: 0,
    widePhone: 412,
  },
  textVariants: {
    hugeTitle: {
      fontFamily: 'AtlasDL3.1AAA-Bold',
      fontSize: 30,
      color: 'primaryText',
      textAlign: 'left',
    },
    extraLargeTitle: {
      fontFamily: 'AtlasDL3.1AAA-Bold',
      fontSize: 26,
      color: 'primaryText',
      textAlign: 'left',
    },
    largeTitle: {
      fontFamily: 'AtlasDL3.1AAA-Bold',
      fontSize: 20,
      color: 'primaryText',
      textAlign: 'left',
    },
    text: {
      fontFamily: 'AtlasDL3.1AAA-Regular',
      fontSize: 16,
      color: 'primaryText',
      textAlign: 'left',
    },
    smallText: {
      fontFamily: 'AtlasDL3.1AAA-Regular',
      fontSize: 14,
      color: 'primaryText',
      textAlign: 'left',
    },
    boxTitle: {
      fontFamily: 'AtlasDL3.1AAA-Bold',
      fontSize: 16,
      color: 'primaryText',
      textAlign: 'left',
    },
    boxInfo: {
      fontFamily: 'AtlasDL3.1AAA-Medium',
      fontSize: 13,
      color: 'eventBoxDateColor',
    },
    boxSubtitle: {
      fontFamily: 'AtlasDL3.1AAA-Regular',
      fontSize: 15,
      color: 'subText',
    },
    appLink: {
      fontFamily: 'AtlasDL3.1AAA-Medium',
      fontSize: 15,
      color: 'link',
    },
    roundedButtonText: {
      fontFamily: 'AtlasDL3.1AAA-Bold',
      fontSize: 16,
    },
    circularButtonText: {
      fontFamily: 'AtlasDL3.1AAA-Medium',
      fontSize: 12,
    },
    importantText: {
      fontFamily: 'AtlasDL3.1AAA-Bold',
      fontSize: 16,
      color: 'important',
      textAlign: 'left',
    },
    formLabel: {
      fontSize: 16,
    },
  },
});

export type Theme = typeof theme;
export default theme;
