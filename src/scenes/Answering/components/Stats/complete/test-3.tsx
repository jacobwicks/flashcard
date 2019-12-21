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
    
    //if there are stats for the current question, popup shows you the correct stats
});


