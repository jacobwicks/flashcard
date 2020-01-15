import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { CardActionTypes } from '../../../../types';
import { CardContext } from '../../../../services/CardContext';

const Buttons = ({
    answered,
    submit
}:{
    answered: boolean,
    submit: () => void
}) => {
    const { dispatch } = useContext(CardContext);

    return answered
    ?   <Button.Group>
            <Button content='Right' positive 
                onClick={() => dispatch({ type: CardActionTypes.next })}
            />
            <Button.Or/>
            <Button content='Wrong' negative 
                onClick={() => dispatch({ type: CardActionTypes.next })}
            />    
        </Button.Group>
    :   <Button content='Submit'/>
}; 

export default Buttons;