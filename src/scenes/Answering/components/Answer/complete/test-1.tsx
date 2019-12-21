import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardProvider, initialState } from '../../../../services/CardContext';
import Answer from './index';

afterEach(cleanup);

const renderAnswer = (visible?: boolean) => render(
  <CardProvider>
    <Answer visible={visible !== undefined ? visible : true}/>
  </CardProvider>
);

it('renders without crashing', () => {
    renderAnswer();
});