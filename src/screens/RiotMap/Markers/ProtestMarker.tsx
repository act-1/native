import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { Box, Text } from '../../../components';
import BaseMarker from './BaseMarker';

// Android displays the counter incorrectly
const isAndroid = Platform.OS === 'android';

function ProtestMarker(props: MarkerProps) {
  return (
    <BaseMarker {...props} arrowFillColor="#DFDFDF">
      <>
        {!isAndroid && (
          <Box style={styles.counterContainer}>
            <Text variant="smallText">{props.counter}</Text>
          </Box>
        )}

        <Image
          source={{ uri: 'https://res.cloudinary.com/act1/image/upload/v1614841512/featured_pictures/balfur-rabaati.jpg' }}
          style={{ width: '100%', height: '100%', zIndex: 1 }}
        />
      </>
    </BaseMarker>
  );
}

export default React.memo(ProtestMarker);

const styles = StyleSheet.create({
  counterContainer: {
    position: 'absolute',
    top: -12.5,
    left: -10,
    zIndex: 10,
    backgroundColor: '#eb524b',
    paddingHorizontal: 4.5,
    paddingVertical: 2.5,
    borderRadius: 50,
  },
});
