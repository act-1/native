import React from 'react';
import { ImageBackground, ViewStyle } from 'react-native';
import { Box, Text } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';

type ProvinceCardProps = { province: string; counter: number; imageUrl: string; containerStyle?: ViewStyle };

function ProvinceCard({ province, counter, imageUrl, containerStyle }: ProvinceCardProps) {
  return (
    <TouchableScale activeScale={0.96} friction={20} style={containerStyle}>
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
            <Text variant="largeTitle" color="primaryColor" fontFamily="AtlasDL3.1AAA-Medium">
              {counter} מפגינים
            </Text>
          </Box>
        </Box>
      </ImageBackground>
    </TouchableScale>
  );
}

export default ProvinceCard;
