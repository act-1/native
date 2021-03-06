import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from '../../components';
import { Blurhash } from 'react-native-blurhash';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function ProfileCheckInBox({ checkIn }: { checkIn: CheckIn }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ width: '100%', padding: 12 }}
      onPress={() => checkIn.eventId && navigation.navigate('EventPage', { eventId: checkIn.eventId })}
    >
      {checkIn.blurhash && <Blurhash blurhash={checkIn.blurhash} style={styles.boxBackground} />}
      <Box flexDirection="row" alignItems="center">
        {checkIn.eventThumbnail ? (
          <Box elevation={8} shadowOpacity={0.35} shadowOffset={{ width: 0, height: 1 }}>
            <FastImage
              source={{
                uri: checkIn.eventThumbnail,
              }}
              style={{ width: 100, height: 52.5, borderRadius: 4 }}
            />
          </Box>
        ) : (
          <FastImage
            source={require('@assets/icons/location-circular-icon.png')}
            style={{ width: 40, height: 40, borderRadius: 4 }}
          />
        )}

        <Box marginLeft="m">
          <Text
            variant="boxTitle"
            marginBottom="xxs"
            fontSize={15}
            textShadowColor="mainBackground"
            textShadowOffset={{ width: 0, height: 1 }}
            textShadowRadius={3}
          >
            {checkIn.eventName || checkIn.locationName}
          </Text>

          <Text
            variant="boxSubtitle"
            color="lightText"
            marginBottom="xxs"
            fontSize={13}
            textShadowColor="mainBackground"
            textShadowOffset={{ width: 0, height: 1 }}
            textShadowRadius={3}
          >
            {checkIn.eventName && `${checkIn.locationName}, `}
            {checkIn.city}
          </Text>

          {checkIn.protestersCount && (
            <Text
              variant="boxInfo"
              textShadowColor="sectionListSeperator"
              textShadowOffset={{ width: 0, height: 1 }}
              textShadowRadius={3}
              opacity={0.9}
            >
              {checkIn.protestersCount} יצאו להפגין
            </Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({ boxBackground: { flex: 1, ...StyleSheet.absoluteFillObject, opacity: 0.4 } });
