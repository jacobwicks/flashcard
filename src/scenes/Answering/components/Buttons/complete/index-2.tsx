import React from 'react';
import { Button } from 'semantic-ui-react';

const Buttons = ({
    answered,
    submit
}:{
    answered: boolean,
    submit: () => void
}) => <Button content='Submit'/>;

export default Buttons;