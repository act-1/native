import React from 'react';
import { render } from '@testing-library/react-native';
import EventBox from './EventBox';

const eventData = {
  title: 'הפגנת ענק בבלפור',
  localDay: 'יום ראשון',
  time: '19:00',
  locationName: 'כיכר פריז, ירושלים',
  thumbnail: new URL('https://plchldr.co/i/200x100'),
  onPress: () => null,
};

test.skip('renders correctly', () => {
  render(<EventBox {...eventData} />);
});
