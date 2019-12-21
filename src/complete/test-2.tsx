import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(cleanup);

//shows the Answering scene
it('shows the Answering component', () => {
    const { getByTestId } = render(<App/>);
    const answering = getByTestId('answering');
    expect(answering).toBeInTheDocument();
  });

//snapshot

  