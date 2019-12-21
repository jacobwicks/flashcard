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
        //text includes 'Answer' because the answer div has the header inside it
        const text = answer.textContent;
        //this is the answer from the card at index 0 in cards
        //current starts out at 0, so we expect it to display the answer from card 0
        const initialAnswer = initialState.cards[initialState.current].answer;
        
        //Answer header is in the div
        //add the string 'Answer' to initialAnswer
        const fullAnswer = 'Answer' + initialAnswer;
            
        //expect the rendered text in the div 
        //to equal the answer from initial state, 
        //plus the 'Answer' string from the header
        expect(text).toEqual(fullAnswer);  
    });  
    
    // has a header with 'Answer' 
    it('has the answer header', () => {
        const { getByText } = renderAnswer();
        const header = getByText(/answer/i);
        expect(header).toBeInTheDocument();
    });
    
 });

 it('If not visible, it isnt visible', () => {
    const { queryByTestId } = renderAnswer(false);
    const answer = queryByTestId('answer');
    
    expect(answer).toBeNull();
});