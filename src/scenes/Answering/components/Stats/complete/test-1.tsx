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
//popup appears when mouseover icon
//if there are no stats for the current question, popup tells you that you haven't seen the question before
//if there are stats for the current question, popup shows you the correct stats


