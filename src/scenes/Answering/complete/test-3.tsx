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

afterEach(cleanup);

//a container
it('has a Container', () => {
    const { getByTestId } = render(<Answering/>);
    const container = getByTestId('container');
    expect(container).toBeInTheDocument();
});

//test to see if the question prompt is in the document
it('has a question prompt', () => {
    //Use Object Destructuring to get getByTestId from the result of render
    const { getByTestId } = render(<Answering/>);

    //find question by searching for testId 'question'
    const question = getByTestId('question');

    //assert that question is in the document
    expect(question).toBeInTheDocument();
});

//the Skip button is in the document
//a textarea to write the answer in
//the Submit button is in the document
//and the snapshot
  