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

describe('when visible, it shows the answer', () => {
    //has the div that will show the answer
    it('has the answer div', () => {
        const { getByTestId } = renderAnswer();
        const answerDiv = getByTestId('answer')
        expect(answerDiv).toBeInTheDocument();
      });

    // shows the right answer

    // has a header with 'Answer'
    
 });
 