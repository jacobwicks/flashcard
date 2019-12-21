import React, { useContext } from 'react';
import { render, cleanup, fireEvent, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardContext, CardProvider, initialState } from '../../../../services/CardContext';
import Subject from './index';
import { Card, CardState } from '../../../../types';

afterEach(cleanup);

const renderSubject = (
    subject: string,
    testState?: CardState, 
    child?: JSX.Element 
    ) => render(
    <CardProvider testState={testState}>
        <Subject subject={subject}/>
        {child}
    </CardProvider>
);

//displays the subject as a menu item
it('shows the subject on screen', () => {
    const subject = initialState.cards[0].subject;
    const { getByText } = renderSubject(subject);
    const subjectDisplay = getByText(subject);
    expect(subjectDisplay).toBeInTheDocument();
});

describe('Collapsed: When clicked it expands, shows menu item for each card', () => {
    //getCard returns a card object
    //the subject is always the same 
    const getCard = (number: number) => ({
        question: `${number}?`,
        answer: `${number}!`,
        subject: 'subject'
    });
    
    //array 1, 2, 3 will get treated as [[1],[2],[3]] by test.each
    const numberOfCards = [1, 2, 3];
    
    //when clicked it should expand to show a menu item for each question in the subject
    //1-3 cards show correct number of card menu items
    test.each(numberOfCards)
    //printing the title uses 'printf syntax'. numbers are %d, not %n
    ('%d different cards display correct number of card menu items', 
    //name the arguments, same order as in the array we generated
    (number) => {
        //generate array of cards
        const cards : Card[] = [];

        for (let i = 1; i <= number; i++) {
            cards.push(getCard(i));
        };
        
        //create state with cards with subjects
        const subjectState = {
            ...initialState,
            cards
        };
        
        //render selector with the state with the subjects
        const { getAllByText, getByText } = renderSubject('subject', subjectState);
        const subject = getByText('subject');
        fireEvent.click(subject);

        const questions = getAllByText(/\?/);
        expect(questions).toHaveLength(number);

        for (let i = 1; i <= number; i++) {
            const numberItem = getByText(`${i.toString()}?`);
            expect(numberItem).toBeInTheDocument();
        };

    });

});

describe('Expanded', () => {
    //clicking a card menuItem selects the card
    it('clicking on a question selects the card for that question', () => {        
        const { question, subject } = initialState.cards[1];
        const showState = {
            ...initialState,
            current: 0,
            show: [subject]
        };

        const DisplaysCurrent = () => {
            const { current } = useContext(CardContext);
            return <div data-testid='current'>{current}</div>
        };
        
        const { getByTestId, getByText } = renderSubject(subject, showState, <DisplaysCurrent />)
        
        const current = getByTestId('current');
        expect(current).toHaveTextContent('0');

        const menuItem = getByText(question);
        fireEvent.click(menuItem);
        
        expect(current).toHaveTextContent('1'); 
    });

    //if the subject is already expanded when it is clicked then it should collapse
});