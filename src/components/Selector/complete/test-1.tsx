import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardContext, CardProvider, initialState } from '../../services/CardContext';
import Selector from './index';
import { Card, CardState } from '../../types';

afterEach(cleanup);

const DisplaysCurrent = () => {
    const { current, show } = useContext(CardContext);
    return(
        <div>
            <div data-testid='current'>{current}</div>
            <div data-testid='show'>
                {show.map(subject => <div key={subject}>{subject}</div>)}
            </div>
        </div>
    ) 
};

const renderSelector = (testState?: CardState, child?: JSX.Element ) => render(
    <CardProvider testState={testState}>
        <Selector/>
        {child}
    </CardProvider>
);

//there is a sidebar
it('has a sidebar', () => {
    const { getByTestId } = renderSelector();
    const sidebar = getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
});

//there is a menu item that says 'subjects'
//clicking the 'subjects' menu item clears the selected subjects so the app will shows cards from all subjects

//the sidebar has menu items in it
// it('when there are cards, the sidebar has a menu item for each subject', () => {
//a menu item appears for each subject in the array cards in CardContext
//clicking on a menu item for a subject selects that subject
//clicking on a menu item for a subject expands that subject and shows a menu item for each question in that subject
//clicking on a menu item for a card question selects that card
