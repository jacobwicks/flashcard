//defines the flashcard objects that the app stores and displays
export interface Card {
    //the answer to the question
    answer: string,

    //the question prompt
    question: string,

    //the subject of the question and answer
    subject: string
}