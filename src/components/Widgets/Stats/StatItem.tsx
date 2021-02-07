import React from 'react';
import { Box, Text } from '../..';

type StatItemProps = {
  title: string;
  count: number;
};

function StatItem({ title, count }: StatItemProps) {
  return (
    <Box alignItems="center" marginHorizontal="s">
      <Text variant="boxTitle" fontSize={14}>
        {count}
      </Text>
      <Text variant="text" fontSize={14} color="subText">
        {title}
      </Text>
    </Box>
  );
}

export default React.memo(StatItem);
