import React, { useContext } from 'react';
import {
    Menu,
    Sidebar
} from 'semantic-ui-react';
import { CardContext } from '../../services/CardContext';
import { CardActionTypes } from '../../types';

const Selector = () => {
    const { cards, dispatch } = useContext(CardContext);
    
    const subjectArray = cards.map(card => card.subject);
    
    const subjectSet = new Set(subjectArray);
    
    const subjects = Array.from(subjectSet)
                    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
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
        {subjects.map(subject => 
            <Menu.Item 
                content={subject}
                key={subject} 
                onClick={() => dispatch({type: CardActionTypes.showAdd, subject})}
            />)}
      </Sidebar>
    )    
};

export default Selector;