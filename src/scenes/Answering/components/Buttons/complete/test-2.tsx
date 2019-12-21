import React, { useState, useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Buttons from './index';
import { CardContext, CardProvider, initialState } from '../../../../services/CardContext';
import { CardState } from '../../../../types';

afterEach(cleanup);

//displays the current index from cardContext
//allows us to check if buttons can change current
const Current = () => {
    const { current } = useContext(CardContext);
    return <div data-testid='current'>{current}</div>
};

//a container component to hold  Buttons 
//submit() changes answered from false to true
const ButtonHolder = ({
    answeredStartsAs,
    testState
}:{
    answeredStartsAs?: boolean
    testState?: CardState
}) => {
    const [answered, setAnswered] = useState(answeredStartsAs !== undefined ? answeredStartsAs : false);

    return (
        <CardProvider testState={testState}>
            <Buttons answered={answered} submit={() => setAnswered(true)}/>
            <Current/>
        </CardProvider>
    )};

//renders without crashing
it('renders without crashing', () => {
    render(<ButtonHolder/>);
});

//Buttons takes a prop answered: boolean 
//if !answered, then it should show a submit button
it('has a submit Button', () => {
    const { getByText } = render(<Buttons answered={false} submit={jest.fn()}/>);
    const submit = getByText(/submit/i);
    expect(submit).toBeInTheDocument();
});

//if answered, then it should show right and wrong buttons
//clicking right advances to next card
//clicking wrong advances to next card
//clicking submit invokes submit, shows right and wrong buttons
