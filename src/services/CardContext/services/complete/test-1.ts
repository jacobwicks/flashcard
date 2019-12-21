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
})