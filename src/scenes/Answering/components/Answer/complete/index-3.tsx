import React, { useContext } from 'react';
import { CardContext } from '../../../../services/CardContext';

const Answer = () => {
    const { cards, current } = useContext(CardContext);
    const { answer } = cards[current];

    return <div data-testid='answer'>{answer}</div>
};

export default Answer;