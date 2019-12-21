import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { saveCards } from './index';
import { initialState } from '../CardContext';

afterEach(cleanup);

//turn off console logging
console.log = jest.fn();

describe('Saving and Loading Cards', () => {
    let originalLocalStorage: Storage

	beforeEach(() => {
		originalLocalStorage = window.localStorage
	})

	afterEach(() => {
        (window as any).localStorage = originalLocalStorage
    })
    
    const { cards } = initialState;
    const stringCards = JSON.stringify(cards);
    
    //saving cards saves cards
    it('Saving cards saves cards', () => {

        const setItem = jest.spyOn(window.localStorage.__proto__, 'setItem');
        
        saveCards(cards);

        expect(setItem).toHaveBeenCalledWith("cards", stringCards);
    })

    //loading cards retrieves saved cards
    it('Loading cards returns saved cards object', () => {
        let mockGetItem = jest.fn().mockReturnValue(stringCards);
        let localStorageMock = {
            getItem: (params: any) => mockGetItem(params),
        } 
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
            })
            

        const loadedCards = loadCards();
        expect(mockGetItem.mock.calls.length).toBe(1);
        expect(mockGetItem.mock.calls[0][0]).toBe('cards');
        expect(loadedCards).toStrictEqual(cards);
    });
    
    //loading cards returns undefined if nothing found
    it('Loading cards when no saved cards returns undefined', () => {
        let mockGetItem = jest.fn().mockReturnValue(undefined);
        let localStorageMock = {
            getItem: (params: any) => mockGetItem(params),
        } 
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
            })
            

        const res = loadCards();
        expect(mockGetItem.mock.calls.length).toBe(1);
        expect(mockGetItem.mock.calls[0][0]).toBe('cards');
        expect(res).toStrictEqual(undefined);
    });
});

//saving stats saves stats
//loading stats retrieves saved stats
//loading stats returns empty object if nothing found
