import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CircularButton from './CircularButton';

test('renders correctly', () => {
  render(<CircularButton iconName="check" color="blue" text="אישור הגעה" />);
});
