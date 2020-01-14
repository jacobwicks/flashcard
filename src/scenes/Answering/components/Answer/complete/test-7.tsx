import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardProvider, initialState } from '../../../../services/CardContext';
import Answer from './index';
import { CardState } from '../../../../types';

afterEach(cleanup);

const renderAnswer = (visible?: boolean, testState?: CardState) => render(
  <CardProvider testState={testState}>
    <Answer visible={visible !== undefined ? visible : true}/>
  </CardProvider>
);

it('renders without crashing', () => {
    renderAnswer();
});

describe('when visible, it shows the answer', () => {
    //has the div that will show the answer
    it('has the answer div', () => {
        const { debug, getByTestId } = renderAnswer();
        const answerDiv = getByTestId('answer');
        debug();
        console.log(answerDiv.textContent);
        expect(answerDiv).toBeInTheDocument();
      });

    // shows the right answer
        // shows the right answer
        it('displays the right answer', () => {
          //testAnswer is a template literal with linebreaks
          const testAnswer = `This has linebreaks
            Here's the second line
            and the third line`;
    
            //create a new array using initialState.cards
            const cards = [...initialState.cards];
            //set the answer of the card at index 0 = to testAnswer
            cards[0].answer = testAnswer;
    
            //create a new CardState with cards, set current to 0
            const testState = {
              ...initialState,
              cards,
              current: 0
            };
    
            //call renderAnswer with visible = true, testState
            const { getByTestId } = renderAnswer(true, testState);
    
            //find the answer div
            const answer = getByTestId('answer');
    
            //the answer div should have 4 children
            //one child is the Header
            //plus three more child divs, one for each line in testAnswer
            expect(answer.children).toHaveLength(4);
    
            //use Array.split to split testAnswer into an array
            //the regular expression /\n/g identifies all the linebreaks
            const testAnswerArray = testAnswer.split(/\n/g);
    
            const firstLine = answer.children[1];
            const secondLine = answer.children[2];
            const thirdLine = answer.children[3];
    
            expect(firstLine.textContent).toEqual(testAnswerArray[0]);
            expect(secondLine.textContent).toEqual(testAnswerArray[1]);
            expect(thirdLine.textContent).toEqual(testAnswerArray[2]);
        });  
      
    
    // has a header with 'Answer' 
    it('has the answer header', () => {
        const { getAllByText } = renderAnswer();
        const header = getAllByText(/answer/i)[0];
        expect(header).toBeInTheDocument();
    });
    
 });

 it('If not visible, it isnt visible', () => {
    const { queryByTestId } = renderAnswer(false);
    const answer = queryByTestId('answer');
    
    expect(answer).toBeNull();
});