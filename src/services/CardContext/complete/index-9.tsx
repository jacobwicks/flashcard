import React, { createContext, useEffect, useReducer } from 'react';
import { Card, CardState } from '../../types';
import { saveCards } from '../Save';
import { getInitialState } from './services';

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
    
            const newCards = cards.filter(v => !!v.question);
    
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
        case 'select' : {
            const { cards } = state;
            const { question } = action;
    
            if (!question) return state;            
            
            const current = cards.findIndex(card => card.question === question);
    
            if (current < 0 ) return state;
            
            return {
                ...state,
                current
            }
        }
        //default case returns the previous state without changing it
        default: 
            return state
    };
};

export const initialState = getInitialState(); 

//a context object made from initialState
const CardContext = createContext(initialState);

//the Props that the CardProvider will accept
type CardProviderProps = {
    //You can put react components inside of the Provider component
    children: React.ReactNode;
    
    //We might want to pass a state into the CardProvider for testing purposes
    testState?: CardState,

    testDispatch?: (arg: any) => void
};


const CardProvider = ({ children, testState, testDispatch }: CardProviderProps ) => {
    //useReducer returns an array containing the state at [0]
    //and the dispatch method at [1]
    //use array destructuring to get state and dispatch 
    const [state, dispatch] = useReducer(reducer, testState ? testState : initialState);

    useEffect(() => {
        //save cards to localStorage
        saveCards(state.cards);
  }, [state.cards])


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