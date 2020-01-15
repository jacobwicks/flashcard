import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(cleanup);

//shows the Answering scene
it('shows the Answering scene', () => {
  const { getByText } = render(<App/>);

  //the Answering scene shows the Skip button
  const skip = getByText(/skip/i);

  //if we find the skip button, we know Answering is showing up
  expect(skip).toBeInTheDocument();
});

//shows the NavBar
it('shows the NavBar', () => {
  const { getByText } = render(<App/>);

  //the navbar has a header with the words "Flashcard App" in it
  const navBar = getByText(/flashcard app/i);

  //if we find the header text, we know the NavBar is showing up
  expect(navBar).toBeInTheDocument();
});

//shows the Selector
it('shows the Selector', () => {
  const { getByTestId } = render(<App/>);
  const selector = getByTestId('sidebar');
  expect(selector).toBeInTheDocument();
});

//snapshot
it('Matches Snapshot', () => {
  const { asFragment } = render(<App/>);
  expect(asFragment()).toMatchSnapshot(); 
});