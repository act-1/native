import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../../components';
import BaseMarker from './BaseMarker';

const reportMarkerEmojis = {
  policeViolence: '👮🏻‍♂️👊',
  general: '⚠️',
};

// Todo: map `reportType` keys to reportMarkerEmojis
type ReportMarkerProps = MarkerProps & {
  reportType: 'policeViolence' | 'general';
};

function ReportMarker(props: ReportMarkerProps) {
  return (
    <BaseMarker {...props} style={styles.markerStyle}>
      <Text fontSize={20} maxFontSizeMultiplier={1.05} textAlign="center">
        {reportMarkerEmojis[props.reportType]}
      </Text>
    </BaseMarker>
  );
}

export default React.memo(ReportMarker);

const styles = StyleSheet.create({
  markerStyle: {
    height: 35,
    backgroundColor: '#fff',
  },
  counterContainer: {
    position: 'absolute',
    top: -12.5,
    left: -10,
    backgroundColor: '#eb524b',
    paddingHorizontal: 4.5,
    paddingVertical: 2.5,
    borderRadius: 50,
  },
});
