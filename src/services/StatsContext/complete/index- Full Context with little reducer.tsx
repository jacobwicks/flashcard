import React, { createContext, useReducer } from 'react';
import { StatsAction, StatsState } from '../../types';

//the reducer handles actions
export const reducer = (state: StatsState, action: StatsAction) => {
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
export const initialState = {
    dispatch: (action: StatsAction) => undefined
} as StatsState;

const StatsContext = createContext(initialState);

//the Props that the StatsProvider will accept
type StatsProviderProps = {
    //You can put react components inside of the Provider component
    children: React.ReactNode;
    
    //We might want to pass a state into the StatsProvider for testing purposes
    testState?: StatsState
};

const StatsProvider = ({ children, testState }: StatsProviderProps) => {
    const [state, dispatch] = useReducer(reducer, testState ? testState : initialState);
    const value = {...state, dispatch} as StatsState;
    return (
        <StatsContext.Provider value={value}>
            {children}
        </StatsContext.Provider>
    )};

export { 
    StatsContext, 
    StatsProvider 
};