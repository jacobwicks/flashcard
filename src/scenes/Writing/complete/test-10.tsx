import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardProvider, CardContext, initialState } from '../../services/CardContext';
import { CardState } from '../../types';
import Writing from './index';

afterEach(cleanup);

//displays last card in the cards array
const LastCard = () => {
    const { cards } = useContext(CardContext);
    //gets the question from the last card in the array
    const lastCard = cards[cards.length - 1].question;
  
    return <div data-testid='lastCard'>{lastCard}</div>
};

const renderWriting = (
    testState?: CardState, 
    child?: JSX.Element 
    ) => render(
        <CardProvider testState={testState}>
            <Writing />
            {child}
        </CardProvider>);


//there's an input where the user can enter the subject of the card
it('has an input to write the subject in', () => {
    const { getByTestId } = renderWriting();
    const subject = getByTestId('subject');
    expect(subject).toBeInTheDocument();
});

//There's a textarea where the user can enter the question prompt of the card
it('has a textarea to write the question in', () => {
    const { getByTestId } = renderWriting();
    const question = getByTestId('question');
    expect(question).toBeInTheDocument();
});

//there's a textarea where the user can enter the answer to the question
it('has a textarea to write the answer in', () => {
    const { getByTestId } = renderWriting();
    const answer = getByTestId('answer');
    expect(answer).toBeInTheDocument();
});

//there's a button to save the card
it('has a save button', () => {
    const { getByText } = renderWriting();
    const save = getByText(/save/i);
    expect(save).toBeInTheDocument();
});

//when you enter a subject, question, and answer and click the save button a new card is created
it('adds a card when you save', () => {
    //the LastCard component just displays the question from the last card in cardContext
    //if we add a card and it shows up in last card, we'll know saving works
    const { getByTestId, getByText } = renderWriting(undefined, <LastCard/>);

    //the strings that we will set the input values to
    const newSubject = 'Test Subject';
    const newQuestion = 'Test Question';
    const newAnswer = 'Test Answer';
    
    //We are using a Semantic UI React Input component
    //this renders as an input inside a div => <div><input></div>
    //so targeting 'subject' will target the outside div, while we want the actual input
    //subject has a children property, which is an array of the child nodes
    //children[0] is the input
    const subject = getByTestId('subject');
    const subjectInput = subject.children[0];
    fireEvent.change(subjectInput, { target: { value: newSubject } });
    expect(subjectInput).toHaveValue(newSubject);

    //The TextArea component doesn't have the same quirk
    //question and answer use TextAreas instead of Input
    const question = getByTestId('question');
    fireEvent.change(question, { target: { value: newQuestion } });
    expect(question).toHaveValue(newQuestion);

    const answer = getByTestId('answer');
    fireEvent.change(answer, { target: { value: newAnswer } });
    expect(answer).toHaveValue(newAnswer);

    const save = getByText(/save/i);
    fireEvent.click(save);

    const lastCard = getByTestId('lastCard');
    expect(lastCard).toHaveTextContent(newQuestion);
});

//when you load writing, it loads the current card
it('loads the current card', () => {
    //the question and answer may have linebreaks
    //but the linebreaks don't render inside the components
    //this function strips the linebreaks out of a string 
    //so we can compare the string to text content that was rendered
    const withoutLineBreaks = (string: string) => string.replace(/\s{2,}/g, " ")

    //we'll test with the first card
    const card = initialState.cards[initialState.current];
    const { getByTestId } = renderWriting();
    
    //a textarea
    const answer = getByTestId('answer');
    expect(answer).toHaveTextContent(withoutLineBreaks(card.answer));

    //a textarea
    const question = getByTestId('question');
    expect(question).toHaveTextContent(withoutLineBreaks(card.question));

    // semantic-ui-react Input. It renders an input inside of a div
    //so we need the first child of the div
    //and because it's an input, we test value not textcontent
    const subject = getByTestId('subject').children[0];
    expect(subject).toHaveValue(card.subject);
});

describe('the new card button', () => {
    //there's a button to create a new card
    it('has a new button', () => {
        const { getByText } = renderWriting();
        const newButton = getByText(/new/i);
        expect(newButton).toBeInTheDocument();
    });
    
    //when you click the new button the writing component clears its inputs
    it('when you click the new card button the writing component clears its inputs', () => {
        const { getByText, getByTestId } = renderWriting();

        const answer = getByTestId('answer');
        expect(answer.textContent).toBeTruthy();

        const question = getByTestId('question');
        expect(question.textContent).toBeTruthy();

        const subject = getByTestId('subject').children[0];
        expect(subject).toHaveValue();

        const newButton = getByText(/new/i);
        fireEvent.click(newButton);

        expect(answer.textContent).toBeFalsy();
        expect(question.textContent).toBeFalsy();
        expect(subject).not.toHaveValue();
    })
});

describe('the delete card button', () => {
    //there's a button to delete the current card
    it('has a delete button', () => {
        const { getByText } = renderWriting();
        const deleteButton = getByText(/delete/i);
        expect(deleteButton).toBeInTheDocument();
    });

    //when you click the delete button 
    //the card matching the question in the question textarea 
    //is deleted from the array cards
    it('clicking delete removes the selected question', () => {
        const lastIndex = initialState.cards.length - 1;
        const lastState = {
            ...initialState,
            current: lastIndex
        };
        const lastQuestion = initialState.cards[lastIndex].question;

        const { getByTestId, getByText } = renderWriting(lastState, <LastCard />);

        const lastCard = getByTestId('lastCard');
        expect(lastCard).toHaveTextContent(lastQuestion);

        //call this deleteButton, delete is a reserved word
        const deleteButton = getByText(/delete/i);
        fireEvent.click(deleteButton);

        expect(lastCard).not.toHaveTextContent(lastQuestion);
    });
});