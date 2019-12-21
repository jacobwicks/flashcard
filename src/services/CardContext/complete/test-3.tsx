import React, { useContext } from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { reducer } from './index';
import { CardProvider, initialState } from './index';

afterEach(cleanup);

describe('CardContext reducer', () => {
    it('returns state', () => {
        const action = { type: undefined };
        expect(reducer(initialState, action)).toEqual(initialState);
    })
})

it('renders without crashing', () => {
    render(<CardProvider children={[<div key='child'/>]}/>)
});
