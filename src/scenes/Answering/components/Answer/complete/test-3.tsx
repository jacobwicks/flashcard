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
    it('displays the right answer', () => {
        const { getByTestId } = renderAnswer();
        //find the answer div
        const answer = getByTestId('answer');
        //get the textContent
        const text = answer.textContent;
        
        //this is the answer from the card at index current in cards
        const initialAnswer = initialState.cards[initialState.current].answer;
        
        //expect the rendered text in the div 
        //to equal the answer from initial state, 
        expect(text).toEqual(initialAnswer); 
    });  
    
    // has a header with 'Answer'
    
 });
 