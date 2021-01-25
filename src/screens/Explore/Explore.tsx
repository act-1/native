import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Text, PictureThumbList } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import Icon from 'react-native-vector-icons/Feather';

function Explore() {
  const { exploreStore } = useStore();

  return (
    <Box>
      <SafeAreaView />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 8, paddingHorizontal: 8 }}
      >
        <Box
          borderWidth={1}
          backgroundColor="primaryColor"
          paddingHorizontal="xm"
          paddingVertical="xs"
          borderColor="seperator"
          borderRadius={5}
          marginRight="s"
          flexDirection="row"
          alignItems="center"
        >
          <Text variant="text" fontSize={14} fontWeight="600">
            נבחרות
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            אחרונות
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            באיזורי
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            ירושלים
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            תל אביב
          </Text>
        </Box>
        <Box borderWidth={1} paddingHorizontal="xm" paddingVertical="xs" borderColor="seperator" borderRadius={5} marginRight="s">
          <Text variant="text" fontSize={14} fontWeight="600">
            חיפה
          </Text>
        </Box>
      </ScrollView>
      <PictureThumbList pictures={exploreStore.pictures} />
    </Box>
  );
}

export default observer(Explore);
