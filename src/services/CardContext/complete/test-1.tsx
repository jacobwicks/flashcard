import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { reducer } from './index';

afterEach(cleanup);

describe('CardContext reducer', () => {
    it('returns state', () => {
        const state = {};
        const action = { type: undefined };
        expect(reducer(state, action)).toEqual(state);
    })
})