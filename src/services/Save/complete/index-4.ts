import { Card, StatsType } from '../../types';

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

export const saveStats = (stats: StatsType) => {
  try {
    localStorage.setItem('stats', JSON.stringify(stats));
  } catch (err) {
    console.error(err);
  }
};

export const loadStats = () => {
  try {
    const stored = localStorage.getItem('stats');
    
    return stored 
      ?  JSON.parse(stored) as StatsType
      : {} as StatsType
  } catch (err) {
      console.error("couldn't get stats from localStorage");
      return {} as StatsType;
  }
};
