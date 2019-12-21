import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { reducer } from './index';
import { CardContext, CardProvider, initialState } from './index';
import { CardAction, CardState } from '../../types';
import { Button } from 'semantic-ui-react';

afterEach(cleanup);

describe('CardContext reducer', () => {
    it('returns state', () => {
        const action = { type: undefined };
        expect(reducer(initialState, action)).toEqual(initialState);
    });

    it('next increments current', () => {
        //declare CardAction with type of 'next'
        const nextAction: CardAction = { type: 'next'};

        //create a new CardState with current === 0
        const zeroState = {
            ...initialState,
            current: 0
        };

        //pass initialState and nextAction to the reducer 
        expect(reducer(zeroState, nextAction).current).toEqual(1);
    });

    it('next action when curent is lastIndex of cards returns current === 0 ', () => {
        const nextAction: CardAction = { type: 'next'};
        
        //get last valid index of cards
        const lastIndex = initialState.cards.length - 1;

        //create a CardState object where current is the last valid index of cards
        const lastState = {
            ...initialState,
            current: lastIndex
        };
        
        //pass lastState and nextAction to reducer
        expect(reducer(lastState, nextAction).current).toEqual(0);
    });

})

it('renders without crashing', () => {
    render(<CardProvider children={[<div key='child'/>]}/>)
});

//A helper component to get cards out of CardContext
//and display them so we can test
const CardConsumer = () => {
    //get cards and the index of the current card
    //also get dispatch 
    const { cards, current, dispatch } = useContext(CardContext);

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
        <Button onClick={() => dispatch({type: 'next'})}>Next</Button>
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

    //dispatching next from component increments value of current 
    it('dispatching next action from component increments value of current', () => {
        //create a new CardState with current === 0
        const zeroState = {
            ...initialState,
            current: 0
        };

        const { getByTestId, getByText } = renderProvider(zeroState);
        
        //get currentDiv with testId
        const currentDiv = getByTestId(/current/i);
        //textContent should be 0
        expect(currentDiv).toHaveTextContent('0');

        //get nextButton by text- users find buttons with text
        const nextButton = getByText(/next/i);
        //click the next button
        fireEvent.click(nextButton);

        expect(currentDiv).toHaveTextContent('1');
    });

});