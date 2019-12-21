//the reducer handles actions
export const reducer = (state: any, action: any) => {
    //switch statement looks at the action type
    //if there is a case that matches the type it will run that code
    //otherwise it will run the default case
    switch(action.type) {
        //default case returns the previous state without changing it
        default: 
            return state
    }
};