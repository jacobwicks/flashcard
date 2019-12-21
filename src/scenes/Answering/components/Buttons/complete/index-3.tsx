import React from 'react';
import { Button } from 'semantic-ui-react';

const Buttons = ({
    answered,
    submit
}:{
    answered: boolean,
    submit: () => void
}) => answered
    ?   <Button.Group>
            <Button content='Right' positive />
            <Button.Or/>
            <Button content='Wrong' negative />
        </Button.Group>
    :   <Button content='Submit'/>;

export default Buttons;