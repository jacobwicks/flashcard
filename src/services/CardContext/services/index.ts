import { loadCards } from '../../Save';
import { Card, CardAction, CardState } from '../../../types';

//declare a card object
const card1: Card = {
    question: 'What is a linked list?',
    subject: 'Linked List',
//answer is inside of backticks
//this makes it a 'template literal`
//template literals can contain linebreaks
    answer: `A linked list is a sequential list of nodes. 
    The nodes hold data. 
    The nodes hold pointers that point to other nodes containing data.`
};

//declare another card object
const card2: Card = {
    question: 'What is a stack?',
    subject: 'Stack',
    answer: `A stack is a one ended linear data structure.
    The stack models real world situations by having two primary operations: Push and pop.
    Push adds an element to the stack.
    Pop pulls the top element off of the stack.`
};

//make an array with both cards
//this is the starting deck of flashcards
export const cards = [card1, card2];

//loadedCards is the result of calling loadCards
//try to get saved cards from localStorage
const loadedCards = loadCards();

//https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
//shuffles the array it receives
const shuffle = (array: any[]) => {
    if (array.length > 0) {
        for(let i: number = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
      }
    };
    return array;
};

//a function that loads the cards from localStorage
//and returns a CardState object
export const getInitialState = () => ({
    //the cards that are displayed to the user
    //if loadedCards is undefined, use cards
    cards: loadedCards ? shuffle(loadedCards) : cards,

    //index of the currently displayed card
    current: 0,
    
    //placeholder for the dispatch function
    dispatch: (action:CardAction) => undefined,

    //the array of subjects to show the user
    show: []
} as CardState);

//this function gets the index of the next cards
export const getNext = ({
    cards,
    current,
    show
}:{
    cards: Card[],
    current: number,
    show: string[]
}) => {
    //show array is empty, so we are selecting next from all cards
    if (show.length === 0) {
        const total = cards.length -1;
        //just add 1, if +1 is too big return 0
        const next = current + 1 <= total
              ? current + 1
              : 0;

        return next;
    } else {
        //filter cards. Only keep cards with a subject that's in show 
        const showCards = cards
                        .filter(card => show.includes(card.subject));
        
        //get the index of the current card in the showCards array
        const showCurrent = showCards
        .findIndex(card => card.question === cards[current].question)

        const showTotal = showCards.length - 1;

        //showNext gives us the next index in the showcards array
        const showNext = showCurrent + 1 <= showTotal
        ? showCurrent + 1
        : 0;

        //translate the showNext index to the index of the same card in cards
        const next = cards
        .findIndex(card => card.question === showCards[showNext].question);

        return next;
    };
};
