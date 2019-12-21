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

//snapshot

  
  