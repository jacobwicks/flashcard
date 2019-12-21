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
        //default case returns the previous state without changing it
        default: 
            return state
    }
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