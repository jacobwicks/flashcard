import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Stats from './index';
import { StatsProvider } from '../../../../services/StatsContext'; 
import { StatsState } from '../../../../types';
import { CardProvider } from '../../../../services/CardContext';
import { initialState as cardState } from '../../../../services/CardContext';

afterEach(cleanup);

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

        it('calculates total times seen', () => {
            const { getByTestId, getByText } = renderStats();
            const icon = getByTestId('icon');
            fireEvent.click(icon);
    
            const seen = getByText(/you have seen this question/i);
            expect(seen).toBeInTheDocument();
            expect(seen).toHaveTextContent('You have seen this question 10 times.')
        });

        //remember, current index in our testState is set to 0
        const questionZero = cardState.cards[0].question;
        const expectedStats = statsState[questionZero];
        
        //use test each to test for each type of stat
        test.each`
        stat        | regEx                 | expected
        ${'right'}  | ${/You got it right/i}| ${expectedStats.right.toString()}
        ${'wrong'}  | ${/Wrong/i}           | ${expectedStats.wrong.toString()}
        ${'skip'}   | ${/You skipped it/i}  | ${expectedStats.skip.toString()}
        `('Popup returns correct value of $stat, $expected', 
            ({stat, regEx, expected}) => {
                const { getByTestId, getByText } = renderStats();
                
                //open the popup
                const icon = getByTestId('icon');
                fireEvent.click(icon);

                //find the element by regular expression
                const result = getByText(regEx);
                expect(result).toHaveTextContent(expected);
        });
    })

});