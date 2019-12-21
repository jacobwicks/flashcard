//defines the flashcard objects that the app stores and displays
export interface Card {
    //the answer to the question
    answer: string,

    //the question prompt
    question: string,

    //the subject of the question and answer
    subject: string
}

//the shape of the state that CardContext returns
export interface CardState {
    
    //the array of Card objects
    cards: Card[],
    
    //the index of the currently displayed card object
    current: number,
    
    //the dispatch function that accepts actions
    //actions are handled by the reducer in CardContext
    dispatch: (action: any) => void
};