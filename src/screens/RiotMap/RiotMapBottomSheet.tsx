import React, { useMemo, Ref } from 'react';
import { PixelRatio } from 'react-native';
import { Box, Text, CircularButton } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';

import { ScrollablePictures } from '@components/Widgets';

type RiotMapBottomSheetProps = {
  bottomSheetRef: Ref<BottomSheet>;
  protest: any;
  currentSheetIndex: number;
  setCurrentSheetIndex: (index: number) => void;
};

let fontScale = PixelRatio.getFontScale();
if (fontScale > 1.15) fontScale = 1.15;

function RiotMapBottomSheet({ bottomSheetRef, setCurrentSheetIndex, currentSheetIndex, protest }: RiotMapBottomSheetProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const snapPoints = useMemo(() => [0, 60 * fontScale + insets.bottom, 210 * fontScale + insets.bottom], [insets.bottom]);

  const handleSheetChanges = (index: number) => {
    setCurrentSheetIndex(index);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleComponent={() => <LocationDetailsHandle />}
    >
      <Box flex={1} paddingVertical="xxs" style={{ backgroundColor: '#363636' }}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start" paddingHorizontal="xm">
          <Box>
            <Text variant="extraLargeTitle" marginBottom="xs">
              {protest.name}
            </Text>
            <Text variant="text" marginBottom="xs">
              {protest.city}
            </Text>
          </Box>
          <Box opacity={0.65}>
            <CircularButton iconName="x" color="grey" size="small" onPress={() => bottomSheetRef.current?.close()} />
          </Box>
        </Box>
        <Text variant="text" color="primaryColor" paddingHorizontal="xm" marginBottom="m">
          {protest.counter} עכשיו מפגינים
        </Text>
        {protest.recentPictures?.length > 0 && (
          <ScrollablePictures
            pictures={protest.recentPictures}
            onPicturePress={() =>
              navigation.navigate('EventPictureList', {
                source: 'location',
                sourceId: protest.id,
                title: protest.name,
              })
            }
            size="small"
          />
        )}
      </Box>
    </BottomSheet>
  );
}

export default RiotMapBottomSheet;

const LocationDetailsHandle = () => {
  return (
    <Box
      style={{
        paddingHorizontal: 16,
        paddingVertical: 5,
        backgroundColor: '#363636',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <Box
        style={{
          alignSelf: 'center',
          width: 40,
          height: 5,
          borderRadius: 4,
          backgroundColor: '#696a6c',
        }}
      />
    </Box>
  );
};
