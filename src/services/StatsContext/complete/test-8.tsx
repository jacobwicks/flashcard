import React, { useContext} from 'react';
import { render, cleanup, getByTestId, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { blankStats, initialState, reducer, StatsContext } from './index';
import { Stats, StatsActionType, StatsState } from '../../types';
import { StatsProvider } from './index';
import * as localStorage from '../Save';
import { Button } from 'semantic-ui-react';

afterEach(cleanup);

describe('StatsContext reducer', () => {
    //returns state
    it('returns state', () => {
        const state = {};
        const action = { type: undefined };
        expect(reducer(state, action)).toEqual(state);
    });
        
    describe('Test each case', () => {
        //function that takes a StatsActionType and returns a Stats object
        //may optionally take a stats object
        const getStats = (
            type: StatsActionType, 
            stats?: Stats
            ) => stats 
                    ? ({ ...stats,
                        [type]: stats[type] + 1 })
                    : ({ ...blankStats,
                        [type]: 1 });
    
        const exampleQuestion = 'Is this an example question?';
        
        //function that takes a StatsActionType and returns an action
        const getAction = (
            type: StatsActionType, 
            ) => ({
                type,
                question: exampleQuestion
        });
        
        describe('Reducer adds a new stats object when it receives a new question prompt', () => {
            //uses Array.map to take each value of the enum StatsActionType
            //and return an array of arguments that it.each will run in tests
            const eachTest = Object.values(StatsActionType)
            .map(actionType => {
                //an object of type StatAction
                const action = getAction(actionType);

                //an object of type Stats
                const result = getStats(actionType);

                //return an array of arguments that it.each will turn into a test
                return [
                    actionType,
                    action,
                    initialState,
                    exampleQuestion,
                    result
                ];
            });
            
            //pass the array eachTest to it.each to run tests using arguments
            it.each(eachTest)
            //printing the title from it.each uses 'printf syntax'
            ('%#: %s adds new stats', 
            //name the arguments, same order as in the array we generated
            (actionType, action, initialState, question, result) => {
                    //assert that question isn't already in state
                    expect(initialState[question]).toBeUndefined();

                    //assert that the stats object at key: question matches result
                    expect(reducer(initialState, action)[question]).toEqual(result);
            });
        });

        describe('Reducer returns correct stats', () => {

        //create a state with existing questions
        const existingState = {
            ...initialState,
            [exampleQuestion]: {
                right: 3,
                skip: 2,
                wrong: 0
            },
            'Would you like another example?': {
                right: 2,
                skip: 0,
                wrong: 7
            }
        };

        //Object.Values and array.map to turn StatsActionType into array of arrays of test arguments
        const existingTests = Object.values(StatsActionType)
        .map(actionType => {
            //get the action with the type and the example prompt
            const action = getAction(actionType);
            
            //get the stats for examplePrompt from existingState
            const stats = existingState[exampleQuestion];

            //getStats gives us our expected result
            const result = getStats(actionType, stats);

            //return the array
            return [
                actionType,
                action,
                existingState,
                result,
                exampleQuestion,
            ];
        });
        
        it.each(existingTests)
        ('%#: %s returns correct stats',
            (actionType, action, initialState, result, question) => {
                //assert that question is already in state
                expect(initialState[question]).toEqual(existingState[exampleQuestion]);
                //assert that the stats object at key: question matches result
                expect(reducer(initialState, action)[question]).toEqual(result);
        });
   });
})

});

//StatsContext provides an object with Stats for questions
describe('StatsProvider', () => {
    it('renders without crashing', () => {
        render(<StatsProvider children={[<div key='child'/>]}/>)
    });

    //A helper component to get Stats out of StatsContext
    //and display them so we can test
    const StatsConsumer = () => {
        const stats = useContext(StatsContext);
       
        //stats is the whole StatsState
        //one of its keys is the dispatch key, 
        //so if there's only 1 key there's no stats
        if (Object.keys(stats).length < 2) return <div>No Stats</div>;

        //use the filter method to grab the first question
        const question = Object.keys(stats).filter(key => key !== 'dispatch')[0];
        const { right, skip, wrong } = stats[question];

        //display each property in a div
        return <div>
            <div data-testid='question'>{question}</div>
            <div data-testid='right'>{right}</div>
            <div data-testid='skip'>{skip}</div>
            <div data-testid='wrong'>{wrong}</div>
        </div>
    };

    const exampleQuestion = 'Is this an example question?';
    
    //create a state with existing questions
    const testState: StatsState = {
        ...initialState,
        [exampleQuestion]: {
            right: 3,
            skip: 2,
            wrong: 0
        },
        'Would you like another example?': {
            right: 2,
            skip: 0,
            wrong: 7
        }
    };


    //StatsContext returns a stats object
    describe('StatsContext provides stats object', () => {
        const renderConsumer = () => render(
            <StatsProvider testState={testState}>
                <StatsConsumer/>
            </StatsProvider>)
        
        it('StatsConsumer sees correct question', () => {
            const { getByTestId } = renderConsumer();
            const question = getByTestId('question');
            expect(question).toHaveTextContent(exampleQuestion);
        })

        test.each`
        type        | expected
        ${'right'}  | ${testState[exampleQuestion].right.toString()}
        ${'skip'}   | ${testState[exampleQuestion].skip.toString()}
        ${'wrong'}  | ${testState[exampleQuestion].wrong.toString()}
        `('StatsConsumer sees correct value of $type, returns $expected', 
            ({type, expected}) => {
                const { getByTestId } = renderConsumer();
                const result = getByTestId(type);
                expect(result).toHaveTextContent(expected);
        });

    })
})



// const DeletesCard = () => {
//     const { dispatch } = useContext(CardContext);
//     return <Button content='delete' onClick={() => dispatch({
//         type: CardActionTypes.delete,
//         question
//     })}/>}

// const { getByText } = render(
//     <CardProvider>
//         <DeletesCard/>
//     </CardProvider>);

// const deleteCard = getByText(/delete/i);
// fireEvent.click(deleteCard);

describe('saving to localStorage and loading from localStorage ', () => {
    describe('save', () => {        
        const question = 'Is this an example question?';
        
        const UpdateButtons = () => {
            const { dispatch } = useContext(StatsContext);
            const dispatchStat = (type: StatsActionType) => dispatch({type, question});

            return <div>
                <Button content='right' onClick={() => dispatchStat(StatsActionType.right)}/>
                <Button content='wrong' onClick={() => dispatchStat(StatsActionType.wrong)}/>
                <Button content='skip' onClick={() => dispatchStat(StatsActionType.skip)}/>
            </div>
        }

        const eachTest = Object.values(StatsActionType)
        .map(actionType => {
            //an object of type StatsState
            const result = { [question] : {
                ...blankStats,
                [actionType]: 1
            }}

            //return an array of arguments that it.each will turn into a test
            return [
                actionType,
                result
            ];
        });

        //pass the array eachTest to it.each to run tests using arguments
        test.each(eachTest)
        //printing the title from it.each uses 'printf syntax'
        ('%#: %s saves new stats', 
        //name the arguments, same order as in the array we generated
        (
            actionType, 
            result
            ) => {
            //test starts here            
            const saveStats = jest.spyOn(localStorage, 'saveStats');
            saveStats.mockClear();

            const { getByText } = render(
                <StatsProvider testState={{} as StatsState}>
                    <UpdateButtons />
                </StatsProvider>);

            expect(saveStats).toHaveBeenCalledTimes(1);
            expect(saveStats).toHaveBeenCalledWith({});
            
            const regex = new RegExp(actionType as StatsActionType);
            const button = getByText(regex);
            fireEvent.click(button);

            expect(saveStats).toHaveBeenCalledTimes(2);
            expect(saveStats).toHaveBeenLastCalledWith(result);
            
        });
    });

    //stats is empty object when it does not get stats from localstorage
    //initialState contains saved stats when saved stats are returned from localStorage
});
