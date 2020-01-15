//React lets us create and display components to the user
//We need to import it so that we can look at the components to test them
import React, { useContext } from 'react';

//testing library gives us methods to test components
//we use render to look at React components
//we use cleanup to clear out memory after tests
//fireEvent allows us to click buttons
import { render, cleanup, fireEvent } from '@testing-library/react';

//extend-expect gives us methods that let us say what we think a component will look like when we test it
import '@testing-library/jest-dom/extend-expect';

//This is the Answering component that we are going to write
//we have to import it so that we can look at it to test it
import Answering from './index';

import { CardState } from '../../types';

import { CardProvider, initialState, CardContext } from '../../services/CardContext';

afterEach(cleanup);

const renderAnswering = (testState?: CardState) => {
    return render(
      <CardProvider testState={testState ? testState : initialState}>
        <Answering />
      </CardProvider>
    );
  }

//a container
it('has a Container', () => {
    const { getByTestId } = render(<Answering/>);
    const container = getByTestId('container');
    expect(container).toBeInTheDocument();
});

//test to see if the question prompt is in the document
it('has the question prompt from the current card', () => {
    const { cards, current } = initialState;
    //get the question from current card 
    const currentQuestion = cards[current].question;

    //get getByTestId from the helper function
    const { getByTestId } = renderAnswering();
    
    const question = getByTestId('question');

    //question content should be the question from the current card
    expect(question).toHaveTextContent(currentQuestion);
});

//test to see if the Skip button is in the document
it('has a button to skip the card', () => {
    //use Object Destructuring to get getByText from the result of render
    const { getByText } = render(<Answering/>);

    //find Skip button by searching for string 'Skip'  
    const skip = getByText('Skip');

    //assert that the Skip button is in the document
    expect(skip).toBeInTheDocument();
});

//a textarea to write the answer in
it('has a textArea to type the answer in', () => {

    const { getByTestId } = render(<Answering />);

    const textArea = getByTestId('textarea');

    expect(textArea).toBeInTheDocument();
});

//test to see if the Submit button is in the document
it('has a button to submit the answer', () => {
    //use Object Destructuring to get getByText from the result of render
    const { getByText } = render(<Answering/>);

    //find Submit Button by searching for string 'Submit'  
    const submit = getByText('Submit');

    //assert that the Submit button is in the document
    expect(submit).toBeInTheDocument();
});

//test that skip button works
it('clicks the skip button and the next question appears', () => {
    //create a CardState with current set to 0
    const zeroState = {
        ...initialState,
        current: 0
    };

    //current starts out at 0
    const { getByTestId, getByText } = renderAnswering(zeroState);

    const question = getByTestId('question');
    //current starts out at 0, so question should be cards[0]
    expect(question).toHaveTextContent(initialState.cards[0].question);
  
    const skip = getByText(/skip/i);
    //this should change current index from 0 to 1
    fireEvent.click(skip);
  
    expect(question).toHaveTextContent(initialState.cards[1].question);
  });

describe('submit button controls display of the answer', () => {
    //the answer to the current question
    const initialAnswer = initialState.cards[initialState.current].answer;
    
    //remove lineBreaks from initialAnswer for comparison to textContent of elements 
    const withoutLineBreaks = initialAnswer.replace(/\s{2,}/g, " ");

    const compareToInitialAnswer = (
        content: string, 
        { textContent } : HTMLElement
    ) => !!textContent && 
        textContent
        .replace(/\s{2,}/g, " ")
        .slice(6, textContent.length) === withoutLineBreaks;

it('the answer does not show up before the submit button is clicked', () => {
    const { queryByText } = renderAnswering();
    const answer = queryByText(compareToInitialAnswer);
    expect(answer).toBeNull();
})
    //clicking the submit button makes the answer show up
it('clicks the submit button and shows the answer', () => {    
    const { getByText } = renderAnswering();
    
    //find the submit button
    const submit = getByText(/submit/i);
    //simulating a click on the submit button
    fireEvent.click(submit);
  
    //use a custom function to find the answer
    //because the Answer component sticks a header with text in the answer div
    //the function returns true if content is equal to the initial answer withoutLineBreaks 
    const answer = getByText(compareToInitialAnswer);
    
    //assertion
    expect(answer).toBeInTheDocument();
  });

  //answer goes away
  it('answer disappears when card changes', () => {
    const { getByText, queryByText } = renderAnswering();
    
    //find the submit button
    const submit = getByText(/submit/i);
    //simulating a click on the submit button
    fireEvent.click(submit);
  
    //use a custom function to find the answer
    const answer = getByText(compareToInitialAnswer);
    
    //assertion
    expect(answer).toBeInTheDocument();

    //clicking skip changes the current index 
    const skip = getByText(/skip/i);
    fireEvent.click(skip);

    //the answer to the second question
    const secondAnswer = initialState.cards[initialState.current + 1].answer;
    
    //remove lineBreaks from initialAnswer for comparison to textContent of elements 
    const withoutLineBreaks = secondAnswer.replace(/\s{2,}/g, " ");

    //a function that compares a string to the second answer
    const compareToSecondAnswer = (content: string) => content === withoutLineBreaks;

    //look for the first answer
    const gone = queryByText(compareToInitialAnswer);
    //first answer shouldn't show up
    expect(gone).toBeNull();

    //look for the second answer
    const answer2 = queryByText(compareToSecondAnswer);
    //second answer shouldn't show up
    expect(answer2).toBeNull();
  });
})


describe('clicking the Submit Button makes the Right and Wrong Buttons show up', () => {
    //the Right button does not show up before Submit is clicked
    it('the Right button does not show up before Submit is clicked', () => {
        const { queryByText } = renderAnswering();
        const right = queryByText(/right/i);
        expect(right).toBeNull();
    });
    //the Wrong button does not show up before Submit is clicked
    it('the Wrong button does not show up before Submit is clicked', () => {
        const { queryByText } = renderAnswering();
        const wrong = queryByText(/wrong/i);
        expect(wrong).toBeNull();
    });

    //Clicking Submit makes the Right Button show up
    it('clicks the submit button and shows the Right button', () => {    
        const { getByText } = renderAnswering();
        
        //find the submit button
        const submit = getByText(/submit/i);
        //simulating a click on the submit button
        fireEvent.click(submit);

        const right = getByText(/right/i);
        expect(right).toBeInTheDocument();
    });

    //Clicking Submit makes the Wrong Button show up
    it('clicks the submit button and shows the Wrong button', () => {    
        const { getByText } = renderAnswering();
        
        //find the submit button
        const submit = getByText(/submit/i);
        //simulating a click on the submit button
        fireEvent.click(submit);

        const wrong = getByText(/right/i);
        expect(wrong).toBeInTheDocument();
    });
});


//and the snapshot
it('Matches Snapshot', () => {
    //get the asFragment method so we can look at the component as a DocumentFragment
    const { asFragment } = render(<Answering/>);
  
    //expect the result of asFragment() to match the snapshot of this component
    expect(asFragment()).toMatchSnapshot(); 
});
  