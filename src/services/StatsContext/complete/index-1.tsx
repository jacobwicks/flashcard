import { Stats, StatsAction, StatsState } from '../../types';

//a Stats object
//use as the basis for tracking stats for a new question
export const blankStats = {
    right: 0,
    wrong: 0,
    skip: 0
} as Stats;

//the reducer handles actions
export const reducer = (state: StatsState, action: StatsAction) => {
    //switch statement looks at the action type
    //if there is a case that matches the type it will run that code
    //otherwise it will run the default case
    switch(action.type) {
        //default case returns the previous state without changing it
        default: 
            return state
    }
};