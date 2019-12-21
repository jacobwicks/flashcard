import { Card } from '../../types';

export const saveCards = (cards: Card[]) => {
  try {
      localStorage.setItem('cards', JSON.stringify(cards));
    } catch (err) {
      console.error(err);
    }
};

export const loadCards = () => {
  try {
    const stored = localStorage.getItem('cards');
    return stored 
      ? JSON.parse(stored) as Card[]
      : undefined;
  } catch (err) {
      console.error("couldn't get cards from localStorage");
      return undefined;
  }
};

