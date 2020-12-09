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
    initialColor: '#3498ff',
    pressedColor: '#57abff',
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
};
