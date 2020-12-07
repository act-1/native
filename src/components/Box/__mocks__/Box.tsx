import React, { ReactNode } from 'react';
import { View } from 'react-native';

function Box({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

export default Box;
