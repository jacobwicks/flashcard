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

    const content = answer
        .split(/\n/g)
        .map((string, index) => <div key={index}>{string}</div>);
        
return (
    <Transition visible={visible} animation='drop' duration={500} unmountOnHide>
        <div data-testid='answer'>
            <Header as='h3' content ='Answer'/>
            {content}
        </div>
    </Transition>
)};

export default Answer;