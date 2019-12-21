import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { reducer } from './index';

afterEach(cleanup);

describe('StatsContext reducer', () => {
    //returns state
    it('returns state', () => {
        const state = {};
        const action = { type: undefined };
        expect(reducer(state, action)).toEqual(state);
    });

    //adds a new stats object when it receives a new question
    //handles right action, returns correct stats
    //handles skip action, returns correct stats
    //handles wrong action, returns correct stats

});

//StatsContext provides an object with Stats for questions



