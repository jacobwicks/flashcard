import { Card } from '../../../types';

//this command will reset the mock values in between tests
beforeEach(() => jest.resetModules());

//gets default initialState when it does not get cards from localstorage
it('gets default initialState when no cards in localstorage', () => {

    //the first argument is the path to the file that has the function you want to mock
    //the second argument is a function that returns an object
    //give the object a property for each function you want to mock
    jest.mock('../../Save', () => ({ 
        //loadCards is the only function we are mocking 
        //the value of loadCards is a function that returns undefined
        loadCards: () => undefined 
    }));

    //get the getInitialState function using require
    //put this AFTER THE MOCK, 
    //so now getInitialState will call the mock loadCards
    //and NOT THE REAL loadCards
    const { cards, getInitialState } = require("./index");
    
    const initialState = getInitialState();

    //because we set loadCards up to return undefined
    //getInitialState should return a CardState where the cards array is the default cards array
    expect(initialState.cards).toEqual(cards);
});

//initialState contains saved cards when saved cards returned from localStorage    
it('returns stored cards', () => {
    const mockCards = ['stored card', 'another stored card'];
    
    //See how we have a different return value?
    jest.mock('../../Save', () => ({ 
        loadCards: () => mockCards 
    }));

    const { getInitialState } = require("./index");
    
    const initialState = getInitialState();

    //getInitialState().cards should equal the return value we gave it
    expect(initialState.cards).toEqual(mockCards);
});

//current index should start at 0
it('starts current at 0', () => {
    const { getInitialState } = require('./index');
    
    const initialState = getInitialState();

    expect(initialState.current).toEqual(0);
});

describe('getNext', () => {
    //the getNext function that we're testing
    const { getNext } = require('./index');

    //a helper function. Will generate a Card object from a seed
    //if provided a subject, that will be the card subject
    const getCard = (
        seed: string | number, 
        subject?: string | number
        ) => ({
            question: `${seed}?`,
            answer: `${seed}!`,
            subject: subject ? `${subject}` : `${seed}`
        });
    
    //an array from 0-4. We'll use it to generate some arrays for tests
    const seeds = [0, 1, 2, 3, 4];

    //test that getNext works when show is empty
    describe('show is empty', () => {
        //now we have an array of cards 0-4
        const cards = seeds.map(seed => getCard(seed));

        //show is an empty array of strings
        const show: string[] = [];
        
        //the result for incrementing the last index in an array is 0, not current + 1
        //so that's a different test. We're only running 0, 1, 2, 3 here 
        test.each(seeds.slice(0, 3))('increments current from %d', 
        //name the arguments, same order as in the array we generated
        //renaming 'seed' to 'current'
        (current) => { 
            const next = getNext({
                cards,
                current, 
                show
            });

            //when current is < last index in current, next should be current + 1
            expect(next).toBe(current + 1);
        });

        it('returns 0 when current is last index of cards', () => {
            const next = getNext({
                cards,
                current: 4, 
                show
            });

            //the next index goes back to 0. 
            //If it returned current + 1, or 5, that would be an invalid index 
            expect(next).toBe(0);
        });

    });

    describe('show single subject', () => {
        const selectedSubject = 'selectedSubject';

        //show is now an array with one string in it
        const show: string[] = [selectedSubject];
        
        it('shows only cards from the selected subject', () => {

            //generate an array of cards
            const cards = seeds.map(seed =>
                //seed modulus 2 returns the remainder of dividing the seed number by 2
                //when the remainder is not zero, we'll generate a card from the seed 
                //but the subject will just be the seed, not the selected subject
                //when the remainder is 0, we'll get a card with the selected subject
                seed % 2   
                    ? getCard(seed)
                    : getCard(seed, selectedSubject));

            //the % 2 of 0, 2, and 4 are all 0
            //so the cards generated from 0, 2, and 4 should have subject === selectedSubject 
            //so cards[0, 2, 4] should have the selected sujbject
            //we expect filtering cards for cards with selectedSubject will have a length of 3
            expect(cards.filter(card => card.subject === selectedSubject)).toHaveLength(3);
            
            let current = 0;

            //use a for loop to get next 5 times
            //each time, we should get the index of a card with the selected subject
            for(let i: number = 0; i < 5; i++) {
                const next = getNext({ cards, current, show});
                expect(cards[next].subject).toEqual(selectedSubject);
                current = next;
            }
            
        });

    });

    describe('show multiple subjects', () => {
        //now show is an array of 3 strings
        const show: string[] = [
            'firstSubject',
            'secondSubject',
            'thirdSubject'
        ];
        
        //a function to return a randomly chosen subject from the show array
        const randomSubject = () => show[Math.floor(Math.random() * Math.floor(3))];

        //an empty array.
        //we'll use a for loop to generate cards to fill it up
        const manyCards: Card[] = [];
        
        //We'll put 21 cards into manyCards
        for(let seed = 0; seed < 21; seed++) {
            //modulus 3 this time, just to switch things up
            seed % 3   
                ? manyCards.push(getCard(seed))
                : manyCards.push(getCard(seed, randomSubject()))
        }

        it('shows only cards from the selected subject', () => {
            //to get the number of times to run getNext, we'll cound how many cards in ManyCards
            //have a subject from the show array
            //it's going to be 7 (21/3)
            //but if you were using more unknown numbers, you might want to find it out dynamically  
            const times = manyCards.filter(card => show.includes(card.subject)).length;
            
            let current = 0;
            
            //use a for loop to assert that you always see a card with the selected subject
            //you can run through it as many times as you want
            //you could do i < times * 2 to run through it twice
            for(let i: number = 0; i < times; i++) {
                const next = getNext({ cards: manyCards, current, show});
                expect(show).toContain(manyCards[next].subject);
                current = next;
            }; 
        });
    })
});