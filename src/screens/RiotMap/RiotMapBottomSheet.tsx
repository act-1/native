import React, { useCallback, useMemo, useRef, Ref } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Box, Text, CircularButton } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';

import EventPagePictures from '@screens/EventPage/EventPagePictures';

type RiotMapBottomSheetProps = {
  bottomSheetRef: Ref<BottomSheet>;
  selectedProtest: any;
  currentSheetIndex: number;
  setCurrentSheetIndex: (index: number) => void;
};

function RiotMapBottomSheet({ bottomSheetRef, setCurrentSheetIndex, selectedProtest }: RiotMapBottomSheetProps) {
  const insets = useSafeAreaInsets();
  const picturesOpacity = useRef(new Animated.Value(0)).current;
  const snapPoints = useMemo(() => [0, 50 + insets.bottom, 195 + insets.bottom], [insets.bottom]);

  const onSheetAnimation = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 2) {
        Animated.timing(picturesOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      if (toIndex === 2) {
        Animated.timing(picturesOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }
    },
    [picturesOpacity]
  );

  const handleSheetChanges = useCallback((index: number) => {
    // Workaround for cases when the user dragging the handler to snap #2 and onAnimate isn't being called.
    if (index === 2) {
      Animated.timing(picturesOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }

    setCurrentSheetIndex(index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onAnimate={onSheetAnimation}
      handleComponent={() => <LocationDetailsHandle />}
    >
      <Box flex={1} paddingVertical="xxs" style={{ backgroundColor: '#363636' }}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start" paddingHorizontal="xm">
          <Box marginBottom="xxs">
            <Text variant="extraLargeTitle">{selectedProtest.name}</Text>
            <Text variant="text">ירושלים</Text>
          </Box>
          <Box opacity={0.65}>
            <CircularButton iconName="x" color="grey" size="small" onPress={() => bottomSheetRef.current?.close()} />
          </Box>
        </Box>
        <Animated.View style={{ opacity: picturesOpacity }}>
          <Text variant="text" color="primaryColor" paddingHorizontal="xm" marginBottom="m">
            432 עכשיו מפגינים
          </Text>
          <EventPagePictures location={{ id: 'nayot', name: 'בלפור' }} size="small" />
        </Animated.View>
      </Box>
    </BottomSheet>
  );
}

export default RiotMapBottomSheet;

const styles = StyleSheet.create({});

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
