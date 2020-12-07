import React from 'react';
import { render } from '@testing-library/react-native';
import EventBox from './EventBox';

const eventData = {
  title: 'הפגנת ענק בבלפור',
  dateTime: 'שבת בשעה 19:00',
  location: 'כיכר פריז, ירושלים',
  thumbnailUrl: new URL('https://plchldr.co/i/200x100'),
  onPress: () => null,
};

test('renders correctly', () => {
  render(<EventBox {...eventData} />);
});
