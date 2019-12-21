import React, { useContext } from 'react';
import { CardContext } from '../../../../services/CardContext';
import { Header, Transition } from 'semantic-ui-react';

const Answer = ({
    visible
}:{
    visible: boolean
}) => {
    const { cards, current } = useContext(CardContext);
    const { answer } = cards[current];

return (
    <Transition visible={visible} animation='drop' duration={500} unmountOnHide>
        <div data-testid='answer'>
            <Header as='h3' content ='Answer'/>
            {answer}
        </div>
    </Transition>
)};

export default Answer;