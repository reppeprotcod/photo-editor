import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../components/App';

test('renders buttons', () => {
  render(<App />);
  const showBtn = screen.getByText(/show/i);
  const grayBtn = screen.getByText(/grayscale/i);
  const origBtn = screen.getByText(/original/i);
  expect(showBtn).toBeInTheDocument();
  expect(grayBtn).toBeInTheDocument();
  expect(origBtn).toBeInTheDocument();
});
