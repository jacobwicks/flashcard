import React, { createContext, useReducer } from 'react';
import { Card, CardState } from '../../types';

//declare a card object
const card1: Card = {
    question: 'What is a linked list?',
    subject: 'Linked List',
//answer is inside of backticks
//this makes it a 'template literal`
//template literals can contain linebreaks
    answer: `A linked list is a sequential list of nodes. 
    The nodes hold data. 
    The nodes hold pointers that point to other nodes containing data.`
};

//declare another card object
const card2: Card = {
    question: 'What is a stack?',
    subject: 'Stack',
    answer: `A stack is a one ended linear data structure.
    The stack models real world situations by having two primary operations: Push and pop.
    Push adds an element to the stack.
    Pop pulls the top element off of the stack.`
};

//make an array with both cards
//this is the starting deck of flashcards
const cards = [card1, card2];

//the reducer handles actions
export const reducer = (state: CardState, action: any) => {
    //switch statement looks at the action type
    //if there is a case that matches the type it will run that code
    //otherwise it will run the default case
    switch(action.type) {
          //delete a card
          case 'delete': {
            let { cards, current } = state;
            //the question is the unique identifier of a card
            const { question } = action;
            
            ///creating a new array of cards by spreading the current array of cards
            const newCards = [...cards];
            
            //finds the index of the target card
            const index = newCards.findIndex(card => card.question === question);
            
            //splice removes the target card from the array
            newCards.splice(index, 1);

            //current tells the components what card to display
            //decrement current
            current = current -1;

            //don't pass -1 as current
            if(current < 0) current = 0;

            //spread the old state
            //add the new value of current
            //and return the newCards array as the value of cards
            return {
                ...state,
                current,
                cards: newCards
            }
        }
        case 'new': {
            return {
                ...state,
                current: -1
            }
          }
        case 'next': {
            //get cards and the current index from state
            const { cards, current } = state;

            //total is the last valid index in cards
            const total = cards.length - 1;

            //if current + 1 is less than or equal to total, set next to total
            //else set next to 0
            const next = current + 1 <= total
                ? current + 1
                : 0;
            
            //return a new object created using spread operator
            //use all values from old state 
            //except overwrite old value of current with next
            return {
                ...state,
                current: next
            }
          }
        case 'save' :{
            const { cards } = state;
            const { answer, question, subject, } = action;
            const index = cards
            .findIndex(card => card.question === question);
    
            const card = {
                answer,
                question,
                subject
            } as Card;
    
            const newCards = [...cards.filter(v => !!v.question)];
    
            if (index > -1) {
                newCards[index] = card;
            } else {
                newCards.push(card);
            }
    
            //return new context
            return {
                ...state,
                cards: newCards
            }
        }
        //default case returns the previous state without changing it
        default: 
            return state
    };
};

//the object that we use to make the first Context
//it is a cardState object
export const initialState: CardState = {
    //the deck of cards
    cards,
    
    //the index of the current card that components are looking at
    current: 0,

    //dispatch is a dummy method that will get overwritten with the real dispatch
    //when we call useReducer
    dispatch: ({type}:{type:string}) => undefined,
}; 


//a context object made from initialState
const CardContext = createContext(initialState);

//the Props that the CardProvider will accept
type CardProviderProps = {
    //You can put react components inside of the Provider component
    children: React.ReactNode;
    
    //We might want to pass a state into the CardProvider for testing purposes
    testState?: CardState
};


const CardProvider = ({ children, testState }: CardProviderProps ) => {
    //useReducer returns an array containing the state at [0]
    //and the dispatch method at [1]
    //use array destructuring to get state and dispatch 
    const [state, dispatch] = useReducer(reducer, testState ? testState : initialState);

    //value is an object created by spreading state 
    //and adding the dispatch method
    const value = {...state, dispatch};

    return (
        //returns a Provider with the state and dispatch that we created above
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    )};

export { 
    CardContext, 
    CardProvider 
};