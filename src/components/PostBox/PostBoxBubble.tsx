import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Box } from '../../components';
import Svg, { Path } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

const deviceWidth = Dimensions.get('window').width;

let baseBoxWith = 300;
if (deviceWidth > 400) {
  baseBoxWith = 275;
}

export default function PostBoxBubble({ children }: { children: React.ReactNode }) {
  return (
    <Box alignItems="flex-start" backgroundColor="seperator" style={styles.messageBubble}>
      <Box style={styles.arrowContainer}>
        <Svg
          style={{ left: -6 }}
          width={15.5}
          height={17.5}
          viewBox="32.484 17.5 15.515 17.5"
          enable-background="new 32.485 17.5 15.515 17.5"
        >
          <Path d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z" fill={'#222222'} x="0" y="0" />
        </Svg>
      </Box>
      {children}
    </Box>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: scale(baseBoxWith),
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 2,
    borderRadius: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
