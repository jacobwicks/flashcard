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

//a function that loads the cards from localStorage
//and returns a CardState object
export const getInitialState = () => ({
    //the cards that are displayed to the user
    //if loadedCards is undefined, use cards
    cards: loadedCards ? loadedCards : cards,

    //index of the currently displayed card
    current: 0,
    
    //placeholder for the dispatch function
    dispatch: (action:CardAction) => undefined,

    
} as CardState);