import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Stats from './index';
import { StatsProvider } from '../../../../services/StatsContext'; 
import { StatsState } from '../../../../types';
import { CardProvider } from '../../../../services/CardContext';
import { initialState as cardState } from '../../../../services/CardContext';

//has an icon
it('has an icon', () => {
    // We'll get the icon by using a testId.
    const { getByTestId } = render(<Stats/>);
    const icon = getByTestId('icon')
    expect(icon).toBeInTheDocument();
});

//there's a popup
describe('theres a popup', () => {
    //popup appears when mouseover icon
    it('popup exists and opens', () => {
        const { getByText, getByTestId } = render(<Stats/>);
        
        const icon = getByTestId('icon');
        expect(icon).toBeInTheDocument();
        //can't effectively simulate hover
        //mouseOver and mouseEnter don't trigger it
        //but click does, so... go with it
        fireEvent.click(icon);

        const popup = getByText(/you haven't seen this question before/i);
        expect(popup).toBeInTheDocument();
    });
    
    //if there are no stats for the current question, popup tells you that you haven't seen the question before
   it('without stats, you havent seen it', () => {
        const { getByText, getByTestId } = render(<Stats/>);
        const icon = getByTestId('icon');
        fireEvent.click(icon);
        const unSeen = getByText("You haven't seen this question before");
        expect(unSeen).toBeInTheDocument(); 
    });

    describe('with Stats', () => {
        //some stats
        const stats = {
            right: 3,
            wrong: 2,
            skip: 5
        };

        //a StatsState to pass to StatsProvider
        //using the question from cards index 0
        const statsState = {
            [cardState.cards[0].question] : stats
        } as StatsState;
        
        //a CardState with current set to 0
        const testState = {
            ...cardState,
            current: 0
        };

        //helper function to render stats inside CardProvider, StatsProvider
        const renderStats = () => render(
            <CardProvider testState={testState}>
                <StatsProvider testState={statsState}>
                    <Stats/>
                </StatsProvider>
            </CardProvider>);

        //if there are stats for the current question, popup shows you the correct stats
        it('with stats, shows stats for that question', () => {
            const { getByText, getByTestId } = renderStats();

            const icon = getByTestId('icon');
            fireEvent.click(icon);

            const seen = getByText(/you have seen this question/i);
            expect(seen).toBeInTheDocument();        
        });

    })

});