import React, { useContext } from 'react';
import {
    Menu,
    Sidebar
} from 'semantic-ui-react';
import { CardContext } from '../../services/CardContext';
import { CardActionTypes } from '../../types';

const Selector = () => {
    const { dispatch } = useContext(CardContext);
    
    return (
        <Sidebar
        as={Menu}
        data-testid='sidebar'
        style={{top: 50}}
        vertical
        visible
        width='thin'
      >
        <Menu.Item as='a' onClick={() => dispatch({type: CardActionTypes.showAll})}>Subjects</Menu.Item>
      </Sidebar>
    )    
};

export default Selector;