import React from 'react';
import { SafeAreaView, StyleSheet, Pressable, ViewProps } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function FilterButton({ title, selected, onPress }: { title: string; value: string; selected?: boolean; onPress?: () => void }) {
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

export default function ExploreHeader() {
  const { exploreStore } = useStore();

  return (
    <SafeAreaView>
      <Box flexDirection="row" paddingVertical="s" paddingLeft="s">
        {/* <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 8 }}
        > */}
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
        {/* <FilterButton title="באיזורי" value="recent" />
        <FilterButton title="ירושלים" value="recent" />
        <FilterButton title="תל אביב" value="recent" />
        <FilterButton title="חיפה" value="recent" /> */}
        {/* </ScrollView> */}
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 5,
    paddingVertical: 6,
    borderColor: '#222222',
  },
});
