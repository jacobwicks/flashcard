//React lets us create and display components to the user
//We need to import it so that we can look at the components to test them
import React from 'react';

//testing library gives us methods to test components
//we use render to look at React components
//we use cleanup to clear out memory after tests
import { render, cleanup } from '@testing-library/react';

//extend-expect gives us methods that let us say what we think a component will look like when we test it
import '@testing-library/jest-dom/extend-expect';

//This is the Answering component that we are going to write
//we have to import it so that we can look at it to test it
import Answering from './index';

import { CardState } from '../../types';

import { CardProvider, initialState } from '../../services/CardContext';

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

//and the snapshot
it('Matches Snapshot', () => {
    //get the asFragment method so we can look at the component as a DocumentFragment
    const { asFragment } = render(<Answering/>);
  
    //expect the result of asFragment() to match the snapshot of this component
    expect(asFragment()).toMatchSnapshot(); 
});