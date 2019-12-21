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

    //adds a new stats object when it receives a new question
    it('adds a new stats object when it receives a new question', () => {
        const question = 'Example Question';
        
        //the action we will dispatch to the reducer
        const action = {
            type: StatsActionType.right,
            question
        };

        //the stats should be the blankStats object
        //with right === 1
        const rightStats = {
            ...blankStats,
            right: 1
        };

        //check to make sure that initialState doesn't already have a property [question]
        expect(initialState[question]).toBeUndefined();

        const result = reducer(initialState, action);

        //after getting a new question prompt in an action type 'right'
        //the question stats should be rightStats
        expect(result[question]).toEqual(rightStats);
    });

    //handles right action, returns correct stats
    //handles skip action, returns correct stats
    //handles wrong action, returns correct stats

});

//StatsContext provides an object with Stats for questions
