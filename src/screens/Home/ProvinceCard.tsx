import React from 'react';
import { ImageBackground, ViewStyle } from 'react-native';
import { Box, Text, Ticker } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';

type ProvinceCardProps = { province: string; counter: number; imageUrl: string; onPress: () => void; containerStyle?: ViewStyle };

function ProvinceCard({ province, counter, imageUrl, onPress, containerStyle }: ProvinceCardProps) {
  if (!imageUrl) return null;

  return (
    <TouchableScale activeScale={0.96} friction={20} onPress={onPress} style={containerStyle}>
      <ImageBackground
        style={{ width: '100%', height: 180, justifyContent: 'flex-end' }}
        imageStyle={{ borderRadius: 6 }}
        source={{
          uri: imageUrl,
        }}
      >
        <LinearGradient
          style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', opacity: 1 }}
          colors={['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.75)']}
        />
        <Box flexDirection="row" justifyContent="space-between" alignItems="baseline">
          <Box margin="s" opacity={0.9}>
            <Text variant="extraLargeTitle" color="lightText">
              {province}
            </Text>
            <Box flexDirection="row">
              <Ticker textStyle={{ fontFamily: 'AtlasDL3.1AAA-Medium', fontSize: 20, color: '#eb524b' }}>{counter}</Ticker>
              <Text variant="largeTitle" color="primaryColor" fontFamily="AtlasDL3.1AAA-Medium" style={{ marginLeft: 6 }}>
                מפגינים
              </Text>
            </Box>
          </Box>
        </Box>
      </ImageBackground>
    </TouchableScale>
  );
}

export default React.memo(ProvinceCard);
