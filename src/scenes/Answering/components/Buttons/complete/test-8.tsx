import React, { useState, useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Buttons from './index';
import { CardContext, CardProvider, initialState } from '../../../../services/CardContext';
import { CardState, StatsState } from '../../../../types';
import { StatsContext, StatsProvider } from '../../../../services/StatsContext';

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
    const { getByText } = render(<ButtonHolder answeredStartsAs={false}/>);
    const submit = getByText(/submit/i);
    expect(submit).toBeInTheDocument();
});

describe('when answered is true', () => {
    //if answered, then it should show right and wrong buttons
    it('shows right and wrong buttons', () => {
        const { getByText } = render(<ButtonHolder answeredStartsAs={true}/>);
        
        const right = getByText(/right/i);
        expect(right).toBeInTheDocument();
    
        const wrong = getByText(/wrong/i);
        expect(wrong).toBeInTheDocument();
    });

    const zeroState = {
        ...initialState,
        current: 0
    };

    //clicking right advances to next card
    it('when the user clicks the Right button, the app changes to the next card', () => { 
        //pass testState with current === 0
        const { getByTestId, getByText } = render(<ButtonHolder answeredStartsAs={true} testState={zeroState}/>);
        
        //get the helper component Current
        const current = getByTestId('current');
        //current should show text 0
        expect(current).toHaveTextContent('0');

        //get the right button
        const right = getByText(/right/i);
        //click the right button
        fireEvent.click(right);

        expect(current).toHaveTextContent('1');
    });

    //clicking wrong advances to next card
    it('when the user clicks the Wrong button, the app changes to the next card', () => { 
        //pass testState with current === 0
        const { getByTestId, getByText } = render(<ButtonHolder answeredStartsAs={true} testState={zeroState}/>);
        
        //get the helper component Current
        const current = getByTestId('current');
        //current should show text 0
        expect(current).toHaveTextContent('0');

        //get the wrong button
        const wrong = getByText(/wrong/i);
        //click the wrong button
        fireEvent.click(wrong);

        expect(current).toHaveTextContent('1');
    });

});

//clicking submit invokes submit, shows right and wrong buttons
it('clicking submit shows right and wrong', () => {
    const { getByText, queryByText } = render(<ButtonHolder />)
    
    const submit = getByText(/submit/i);
    expect(submit).toBeInTheDocument();
    
    expect(queryByText(/right/i)).toBeNull()
    expect(queryByText(/wrong/i)).toBeNull()

    fireEvent.click(submit);

    expect(queryByText(/submit/i)).toBeNull();
    expect(getByText(/right/i)).toBeInTheDocument();
    expect(getByText(/wrong/i)).toBeInTheDocument();
});

//when the user clicks the skip button, the skip is recorded in the stats
describe('clicking buttons records stats', () => {
    //create a CardState with current set to 0
    const cardState = {
       ...initialState,
       current: 0
   };

   //a blank stats object
   const blankStats = {
       right: 0,
       wrong: 0,
       skip: 0
   };

   //get the question from cards index 0
   const { question } = cardState.cards[0];

   //create statsState with stats for the question
   const statsState: StatsState = {
       [question]: blankStats
   };

   //helper component displays the value of skip for the question
   const StatsDisplay = () => {
       const stats = useContext(StatsContext)
       const { right, wrong } = stats[question];
       return <div>
           <div data-testid='rightDisplay'>{right}</div>
           <div data-testid='wrongDisplay'>{wrong}</div>
           </div> 
   };
   
   const renderWithDisplay = () => render(
    <CardProvider testState={cardState}>
        <StatsProvider testState={statsState}>
        <Buttons answered={true} submit={jest.fn()} />
        <StatsDisplay/>
    </StatsProvider>
  </CardProvider>
);

//clicking the right button updates stats
    it('clicking the right button updates stats', () => {
        //render Answering and StatsDisplay inside the providers
        //pass the providers the cardState and StatsState values that we defined
        const { getByTestId, getByText } = renderWithDisplay();

        //find the right button
        const rightButton = getByText(/right/i);

        //find the right display
        const rightDisplay = getByTestId('rightDisplay');
        
        //right display should start at 0
        expect(rightDisplay).toHaveTextContent('0');

        //click the right button
        fireEvent.click(rightButton);

        expect(rightDisplay).toHaveTextContent('1');
    });

    //clicking the wrong button updates Stats
    it('clicking the wrong button updates stats', () => {
        //render Answering and StatsDisplay inside the providers
        //pass the providers the cardState and StatsState values that we defined
        const { getByTestId, getByText } = renderWithDisplay();

        //find the wrong button
        const wrongButton = getByText(/wrong/i);

        //find the wrong display
        const wrongDisplay = getByTestId('wrongDisplay');
        
        //wrong display should start at 0
        expect(wrongDisplay).toHaveTextContent('0');

        //click the wrong button
        fireEvent.click(wrongButton);

        expect(wrongDisplay).toHaveTextContent('1');
    });
})