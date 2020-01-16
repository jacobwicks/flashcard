import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardContext, CardProvider, initialState } from '../../services/CardContext';
import Selector from './index';
import { CardState, Card } from '../../types';

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

describe('the subjects menu item', () => {
    //there is a menu item that says 'subjects'
        it('has a subjects menu item', () => {
            const { getByText } = renderSelector();
            //the first menu item in the selector says 'Subjects' on it
            //if we can find that text, we know the sidebar is showing up
            const selector = getByText(/subjects/i);
            expect(selector).toBeInTheDocument();
        });
        
        //clicking the 'subjects' menu item clears the selected subjects so the app will shows cards from all subjects    
        //clicking the 'subjects' menu item clears the selected subjects so the app will shows cards from all subjects
        it('clicking the subjects menu clears show', () => {
            const showSubjects = ['First Subject', 'Second Subject'];
            const showState = {
                ...initialState,
                show: showSubjects
            };

            const { getByText, getByTestId } = renderSelector(showState, <DisplaysCurrent />);
 
            const show = getByTestId('show');
            expect(show.children).toHaveLength(2);

            const subjects = getByText(/subjects/i);
            fireEvent.click(subjects);

            expect(show.children).toHaveLength(0);
        });
});

//the sidebar has menu items in it
describe('when there are cards, the sidebar has a menu item for each subject', () => {
     //test 0 cards
    it('when there are no cards, there is only the "subjects" menu item', () => {
        const noCards = {
            ...initialState,
            cards: []
        };

        const { getByTestId } = renderSelector(noCards);
        const sidebar = getByTestId('sidebar');
        
        expect(sidebar.children).toHaveLength(1);
    });

    //getCard returns a card object
    //the subject is the number argument as a string 
    const getCard = (number: number) => ({
        question: `${number}?`,
        answer: `${number}!`,
        subject: number.toString()
    });

    //array 1, 2, 3 will get treated as [[1],[2],[3]] by test.each
    const numberOfSubjects = [1, 2, 3];
    
    //test 1-3 cards with different subjects
    //1-3 cards show correct number of subject menu items
    test.each(numberOfSubjects)
    //printing the title uses 'printf syntax'. numbers are %d, not %n
    ('%d different subjects display correct number of subject menu items', 
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
        const { getByTestId } = renderSelector(subjectState);
        const sidebar = getByTestId('sidebar');

        expect(sidebar.children).toHaveLength(number + 1);
    });

    //1-3 cards show subject menu items with correct names
    test.each(numberOfSubjects)
    ('%d different subjects display menu items with correct names', 
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
        const { getByTestId, getByText } = renderSelector(subjectState);
        const sidebar = getByTestId('sidebar');

        expect(sidebar.children).toHaveLength(number + 1);

        for (let i = 1; i <= number; i++) {
            const numberItem = getByText(i.toString());
            expect(numberItem).toBeInTheDocument();
        };
        
    });
});

//clicking on a menu item for a subject selects that subject
//clicking on a menu item for a subject expands that subject and shows a menu item for each question in that subject
//clicking on a menu item for a card question selects that card