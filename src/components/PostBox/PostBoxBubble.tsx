import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Box } from '../../components';
import Svg, { Path } from 'react-native-svg';
import { scale } from 'react-native-size-matters';
import { Polygon } from 'react-native-maps';

const deviceWidth = Dimensions.get('window').width;

let baseBoxWith = 300;
if (deviceWidth > 400) {
  baseBoxWith = 275;
}

type PostBoxBubbleProps = {
  children: React.ReactNode;
  direction: 'right' | 'left';
  deleted: boolean;
};

export default function PostBoxBubble({ children, direction, deleted }: PostBoxBubbleProps) {
  return (
    <Box style={[styles.messageContainer, direction === 'right' ? styles.rightMessage : styles.leftMessage]}>
      <Box alignItems="flex-start" backgroundColor="seperator" style={[styles.messageBubble, deleted && styles.deletedMessage]}>
        <Box style={styles.arrowContainer}>
          <Svg
            style={{
              left:
                direction === 'left' ? Platform.select({ ios: 105, android: 155 }) : Platform.select({ ios: -6, android: -4 }),
            }}
            width={15.5}
            height={17.5}
            viewBox="32.484 17.5 15.515 17.5"
            enable-background="new 32.485 17.5 15.515 17.5"
          >
            <Path
              d={
                direction === 'left'
                  ? 'M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'
                  : 'M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'
              }
              fill={deleted ? 'transparent' : '#222222'}
              x="0"
              y="0"
            />
          </Svg>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  messageContainer: { flexDirection: 'row' },
  leftMessage: { width: '100%', justifyContent: 'flex-end' },
  rightMessage: {},
  deletedMessage: { borderColor: '#222222', borderWidth: 1, backgroundColor: 'transparent' },
  messageBubble: {
    maxWidth: scale(baseBoxWith),
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 2,

    borderRadius: 20,
    elevation: 5,
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
  arrow_left_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  arrow_right_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
