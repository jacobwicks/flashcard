import { Card } from '../../types';

export const saveCards = (cards: Card[]) => {
  try {
      localStorage.setItem('cards', JSON.stringify(cards));
    } catch (err) {
      console.error(err);
    }
};