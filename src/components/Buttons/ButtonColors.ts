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
  },
  yellow: {
    initialColor: '#FFC000',
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
    pressedColor: '#F8F8F8',
    textColor: '#666666',
  },
  white: {
    initialColor: '#d4d4d4',
    pressedColor: '#88898b',
    iconColor: '#000',
  },
  black: {
    initialColor: '#0B0B0B',
    pressedColor: '#252525',
    iconColor: '#fff',
    textColor: '#fff',
  },
};
