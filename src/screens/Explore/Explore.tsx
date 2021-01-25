import React from 'react';
import { SafeAreaView, ViewProps, StyleSheet, Pressable } from 'react-native';
import { Box, Text, PictureThumbList } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function FilterButton({
  title,
  value,
  selected,
  onPress,
  style,
}: {
  title: string;
  value: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewProps;
}) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      <Box style={styles.filterButton} backgroundColor={selected ? 'primaryColor' : 'mainBackground'}>
        <Text variant="text" fontSize={14} fontWeight="600" textAlign="center">
          {title}
        </Text>
      </Box>
    </Pressable>
  );
}

function Explore() {
  const { exploreStore } = useStore();

  return (
    <Box>
      <SafeAreaView />
      {/* <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 8 }}
      > */}
      <Box flexDirection="row" paddingVertical="s" paddingLeft="s">
        <FilterButton
          title="נבחרות"
          value="featured"
          selected={exploreStore.currentFilter === 'featured'}
          onPress={() => exploreStore.setCurrentFilter('featured')}
        />
        <FilterButton
          title="אחרונות"
          value="recent"
          selected={exploreStore.currentFilter === 'recent'}
          onPress={() => exploreStore.setCurrentFilter('recent')}
        />
      </Box>
      {/* <FilterButton title="באיזורי" value="recent" />
        <FilterButton title="ירושלים" value="recent" />
        <FilterButton title="תל אביב" value="recent" />
        <FilterButton title="חיפה" value="recent" /> */}
      {/* </ScrollView> */}
      <PictureThumbList
        pictures={exploreStore.currentFilter === 'featured' ? exploreStore.featuredPictures : exploreStore.recentPictures}
      />
    </Box>
  );
}

export default observer(Explore);

const styles = StyleSheet.create({
  filterButton: {
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 5,
    paddingVertical: 6,
    borderColor: '#222222',
  },
});
