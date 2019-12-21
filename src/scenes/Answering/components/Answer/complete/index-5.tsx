import React, { useContext } from 'react';
import { CardContext } from '../../../../services/CardContext';
import { Header } from 'semantic-ui-react';

const Answer = () => {
    const { cards, current } = useContext(CardContext);
    const { answer } = cards[current];

    return (
        <div data-testid='answer'>
            <Header as='h3' content ='Answer'/>
            {answer}
        </div>
    )};

export default Answer;