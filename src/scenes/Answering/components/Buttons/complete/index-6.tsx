import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { CardActionTypes, StatsActionType } from '../../../../types';
import { CardContext } from '../../../../services/CardContext';
import { StatsContext } from '../../../../services/StatsContext';

const Buttons = ({
    answered,
    submit
}:{
    answered: boolean,
    submit: () => void
}) => {
    //get cards and current so that we can get the question
    const { cards, current, dispatch } = useContext(CardContext);
    //get the question so we can track stats
    const { question } = cards[current];

    //to dispatch actions to the StatsContext
    const { dispatch: statsDispatch } = useContext(StatsContext);

    return answered
    ?   <Button.Group>
            <Button content='Right' positive 
                onClick={() => {
                    statsDispatch({ type: StatsActionType.right, question })
                    dispatch({ type: CardActionTypes.next })
                }}/>
            <Button.Or/>
            <Button content='Wrong' negative 
                onClick={() => dispatch({ type: CardActionTypes.next })}
            />    
        </Button.Group>
    :   <Button content='Submit' onClick={() => submit()}/>
}; 

export default Buttons;