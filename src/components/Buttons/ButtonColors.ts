type ButtonColors = {
  initialColor: string;
  pressedColor: string;
  textColor?: string;
  iconColor?: string;
};

type ColorsDict = {
  [index: string]: ButtonColors;
};

export const buttonColors: ColorsDict = {
  blue: {
    initialColor: '#017eff',
    pressedColor: '#3498ff',
    textColor: '#fff',
  },
  green: {
    initialColor: '#08c236',
    pressedColor: '#1ad348',
    textColor: '#fff',
  },
  red: {
    initialColor: '#e53a2b',
    pressedColor: '#eb524b',
    textColor: '#fff',
  },
  yellow: {
    initialColor: '#FFC000',
    pressedColor: '#FFCB2D',
    textColor: '#5A2C06',
  },
  orange: {
    initialColor: '#FFC281',
    pressedColor: '#FFCB2D',
    textColor: '#5A2C06',
  },
  grey: {
    initialColor: '#696a6c',
    pressedColor: '#88898b',
    textColor: '#fff',
  },
  porcelain: {
    initialColor: '#F0F2F5',
    pressedColor: '#e0e0e0',
    textColor: '#2d3436',
  },
  white: {
    initialColor: 'transparent',
    pressedColor: '#18191a59',
    iconColor: '#fff',
  },
  black: {
    initialColor: '#0B0B0B',
    pressedColor: '#252525',
    iconColor: '#fff',
    textColor: '#fff',
  },
  darkBlue: {
    initialColor: '#3164b1',
    pressedColor: '#4571B5',
    textColor: '#fff',
  },
};
