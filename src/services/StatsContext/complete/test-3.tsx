import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { blankStats, initialState, reducer } from './index';
import { StatsActionType } from '../../types';

afterEach(cleanup);

describe('StatsContext reducer', () => {
    //returns state
    it('returns state', () => {
        const state = {};
        const action = { type: undefined };
        expect(reducer(state, action)).toEqual(state);
    });
        
    describe('Test each case', () => {
        //function that takes a StatsActionType and returns a Stats object
        //may optionally take a stats object
        const getStats = (type: StatsActionType) => ({...blankStats, [type]: 1});
    
        const exampleQuestion = 'Is this an example question?';
        
        //function that takes a StatsActionType and returns an action
        const getAction = (
            type: StatsActionType, 
            ) => ({
                type,
                question: exampleQuestion
        });
        
        describe('Reducer adds a new stats object when it receives a new question prompt', () => {
            //uses Array.map to take each value of the enum StatsActionType
            //and return an array of arguments that it.each will run in tests
            const eachTest = Object.values(StatsActionType)
            .map(actionType => {
                //an object of type StatAction
                const action = getAction(actionType);

                //an object of type Stats
                const result = getStats(actionType);

                //return an array of arguments that it.each will turn into a test
                return [
                    actionType,
                    action,
                    initialState,
                    exampleQuestion,
                    result
                ];
            });
            
            //pass the array eachTest to it.each to run tests using arguments
            it.each(eachTest)
            //printing the title from it.each uses 'printf syntax'
            ('%#: %s adds new stats', 
            //name the arguments, same order as in the array we generated
            (actionType, action, initialState, question, result) => {
                    //assert that question isn't already in state
                    expect(initialState[question]).toBeUndefined();

                    //assert that the stats object at key: question matches result
                    expect(reducer(initialState, action)[question]).toEqual(result);
            });
        });
})

});

//StatsContext provides an object with Stats for questions
