import React, { createContext, useReducer } from 'react';

//the reducer handles actions
export const reducer = (state: any, action: any) => {
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
const initialState = {};

//a context object made from initialState
const CardContext = createContext(initialState);

//the Props that the CardProvider will accept
type CardProviderProps = {
    //You can put react components inside of the Provider component
    children: React.ReactNode;
};


const CardProvider = ({ children }: CardProviderProps ) => {
    //useReducer returns an array containing the state at [0]
    //and the dispatch method at [1]
    //use array destructuring to get state and dispatch 
    const [state, dispatch] = useReducer(reducer, initialState);

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
    //some components will import CardContext so they can access the state using useContext
    CardContext, 
    //the App will import the CardProvider so the CardContext will be available to components
    CardProvider 
};