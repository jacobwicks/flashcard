import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { reducer } from './index';
import { CardContext, CardProvider, initialState } from './index';
import { CardAction, CardActionTypes, CardState } from '../../types';
import { Button } from 'semantic-ui-react';
import * as localStorage from '../Save';

afterEach(cleanup);

//console.log = jest.fn();

describe('CardContext reducer', () => {
    it('returns state', () => {
        const action = { type: undefined };
        expect(reducer(initialState, action)).toEqual(initialState);
    });

    it('next increments current', () => {
        //declare CardAction with type of 'next'
        const nextAction: CardAction = { type: CardActionTypes.next };


        //create a new CardState with current === 0
        const zeroState = {
            ...initialState,
            current: 0
        };

        //pass initialState and nextAction to the reducer 
        expect(reducer(zeroState, nextAction).current).toEqual(1);
    });

    it('next action when curent is lastIndex of cards returns current === 0 ', () => {
        const nextAction: CardAction = { type: CardActionTypes.next };
        
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

    //save new card
    it('save action with new question saves new card', () => {
        const answer = 'Example Answer';
        const question = 'Example Question';
        const subject = 'Example Subject';

        //declare CardAction with type of 'save'
        const saveAction: CardAction = { 
            type: CardActionTypes.save,
            question,
            answer,
            subject
        };

        //before the action is processed initialState should not have a card with that question
        expect(initialState.cards.findIndex(card => card.question === question)).toEqual(-1);
        
        //pass initialState and saveAction to the reducer 
        const { cards } = reducer(initialState, saveAction);
        //after the save action is processed, should have one card with that question
        expect(cards.filter(card => card.question === question).length).toEqual(1);

        //array destructuring to get the card out of the filtered array
        const [ card ] = cards.filter(card => card.question === question);

        //the saved card should have the answer from the save action
        expect(card.answer).toEqual(answer);

        //the saved card should have the subject from the save action
        expect(card.subject).toEqual(subject);
   });

    //save changes to existing card
    it('save action with existing question saves changes to existing card', () => {
        const answer = 'Example Answer';
        const question = 'Example Question';
        const subject = 'Example Subject';

        const existingCard = {
            answer,
            question,
            subject
        };
       
        const existingState = {
            ...initialState,
            cards: [
                ...initialState.cards, 
                existingCard
            ]};

        const newAnswer = 'New Answer';
        const newSubject = 'New Subject';

        //declare CardAction with type of 'save'
        const saveAction: CardAction = { 
            type: CardActionTypes.save,
            question,
            answer: newAnswer,
            subject: newSubject
        };

        //the state should have one card with that question
        expect(existingState.cards.filter(card => card.question === question).length).toEqual(1);

        //pass initialState and saveAction to the reducer 
        const { cards } = reducer(initialState, saveAction);

        //Ater processing the action, we should still only have one card with that question
        expect(cards.filter(card => card.question === question).length).toEqual(1);

        //array destructuring to get the card out of the filtered array
        const [ card ] = cards.filter(card => card.question === question);

        //answer should have changed
        expect(card.answer).toEqual(newAnswer);
        //subject should have changed
        expect(card.subject).toEqual(newSubject);
    });

    //new action returns current === -1
    it('new sets current to -1', () => {
        //declare CardAction with type of 'new'
        const newAction: CardAction = { type: CardActionTypes.new };


        //create a new CardState with current === 0
        const zeroState = {
            ...initialState,
            current: 0
        };

        //pass initialState and newAction to the reducer 
        expect(reducer(zeroState, newAction).current).toEqual(-1);
    });

    //delete removes card with matching question
    it('delete removes the card with matching question', () => {
        const { question } = initialState.cards[initialState.current];

        const deleteAction: CardAction = { 
            type: CardActionTypes.delete,
            question
        };

        const { cards } = reducer(initialState, deleteAction);
        
        //it's gone
        expect(cards.findIndex(card => card.question === question)).toEqual(-1);
    });

    //select should set the current index to the index of the selected card
    it('select changes current to the index of the card with the selected question', () => {
        const answer = 'Example Answer';
        const question = 'Example Question';
        const subject = 'Example Subject';

        const thirdCard = {
            answer,
            question,
            subject
        };
       
        const threeCardState = {
            ...initialState,
            cards: [
                ...initialState.cards, 
                thirdCard
            ],
            current: 0
        };

        expect(threeCardState.cards.length).toBe(3);

        const selectAction = {
            type: CardActionTypes.select,
            question
        };

        const { current } = reducer(threeCardState, selectAction);

        expect(current).toEqual(2);
    });
    
    //actions that affect the show array
    describe('Actions for showing subjects', () => {
        //show add adds subjects to the array
        describe('showAdd', () => {
            //showAdd should add a single subject to the show array
            //if the subject is already in show, the subject will not be added

        });
        
        //showAll should clear the show array

        //showRemove should remove a single subject from the show array
    });

}); 

it('renders without crashing', () => {
    render(<CardProvider children={[<div key='child'/>]}/>)
});

describe('saving to localStorage and loading from localStorage ', () => {
    it('when a card is added to cards, attempts to save', () => {
        const saveCards = jest.spyOn(localStorage, 'saveCards');

        const newCard = {
            question: 'New Question',
            subject: 'New Subject',
            answer: 'New Answer'
        };

        const newCards = [...initialState.cards, newCard];
        
        const SavesCard = () => {
            const { dispatch } = useContext(CardContext);
            return <Button content='save' onClick={() => dispatch({
                type: CardActionTypes.save,
                ...newCard
            })}/>}

        const { getByText } = render(
            <CardProvider>
                <SavesCard/>
            </CardProvider>);
        
        expect(saveCards).toHaveBeenCalledTimes(1);
        
        const saveCard = getByText(/save/i);
        fireEvent.click(saveCard);
        expect(saveCards).toHaveBeenCalledTimes(2);
        
        expect(saveCards).toHaveBeenCalledWith(newCards);
        saveCards.mockRestore();
    });

    it('when a card is taken out of cards, attempts to save cards', () => {
        const saveCards = jest.spyOn(localStorage, 'saveCards');

        const { current, cards } = initialState;
        const { question }  = cards[current];
        
        const newCards = cards.filter(card => card.question !== question);

        const DeletesCard = () => {
            const { dispatch } = useContext(CardContext);
            return <Button content='delete' onClick={() => dispatch({
                type: CardActionTypes.delete,
                question
            })}/>}

        const { getByText } = render(
            <CardProvider>
                <DeletesCard/>
            </CardProvider>);
        
        expect(saveCards).toHaveBeenCalledTimes(1);
        
        const deleteCard = getByText(/delete/i);
        fireEvent.click(deleteCard);
        expect(saveCards).toHaveBeenCalledTimes(2);
        
        expect(saveCards).toHaveBeenLastCalledWith(newCards);
    });
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
        <Button onClick={() => dispatch({type: CardActionTypes.next})}>Next</Button>
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
