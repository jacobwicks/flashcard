import React, { useContext } from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { reducer } from './index';
import { CardContext, CardProvider, initialState } from './index';
import { CardState } from '../../types';

afterEach(cleanup);

describe('CardContext reducer', () => {
    it('returns state', () => {
        const action = { type: undefined };
        expect(reducer(initialState, action)).toEqual(initialState);
    })
})

it('renders without crashing', () => {
    render(<CardProvider children={[<div key='child'/>]}/>)
});

//A helper component to get cards out of CardContext
//and display them so we can test
const CardConsumer = () => {
    //get cards and the index of the current card 
    const { cards, current } = useContext(CardContext);

    //get the current card
    const card = cards[current];

    //get the question, answer, and subject from the current card
    const { question, answer, subject } = card;

    //display each property in a div
    return <div>
        <div data-testid='current'>{current}</div>
        <div data-testid='question'>{question}</div>
        <div data-testid='answer'>{answer}</div>
        <div data-testid='subject'>{subject}</div>
    </div>
};

//renders the CardConsumer inside of CardProvider
const renderProvider = (testState?: CardState) => render(
    <CardProvider testState={testState}>
        <CardConsumer/>
    </CardProvider>
);

//testing the CardConsumer using CardContext inside CardProvider
describe('CardConsumer using CardContext', () => {
    //current is 0
    it('has a current value 0', () => {
        const { getByTestId } = renderProvider();
        const current = getByTestId(/current/i);
        expect(current).toHaveTextContent('0');
    });

    //question is the same as initialState.cards[0].question
    it('question is the same as current card', () => {
        //get cards, current from initialState
        const { cards, current } = initialState;
        
        //get the question from the current card
        const currentQuestion = cards[current].question;

        const { getByTestId } = renderProvider();
        //find the question div
        const question = getByTestId(/question/i);

        //question div should match the current question
        expect(question).toHaveTextContent(currentQuestion);
    });

      //subject is the same as initialState.cards[0].subject
      it('subject is the same as current card', () => {
        //get cards, current from initialState
        const { cards, current } = initialState;
        
        //get the subject from the current card
        const currentSubject = cards[current].subject;

        const { getByTestId } = renderProvider();
        //find the subject div
        const subject = getByTestId(/subject/i);

        //subject div should match the current subject
        expect(subject).toHaveTextContent(currentSubject);
    });

    //answer is the same as initialState.cards[0].answer
    it('answer is the same as current card', () => {
        //get cards, current from initialState
        const { cards, current } = initialState;
        
        //get the answer from the current card
        const currentanswer = cards[current].answer;

        const { getByTestId } = renderProvider();
        //find the answer div
        const answer = getByTestId(/answer/i);

        //text content answer div should equal the current answer
        expect(answer.textContent).toEqual(currentanswer);
    });

});
