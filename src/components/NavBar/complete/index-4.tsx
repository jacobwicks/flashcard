import React from 'react';
import { Menu } from 'semantic-ui-react';
import { SceneTypes } from '../../types';

const NavBar = ({
    setShowScene,
    showScene
}:{
    setShowScene: (scene: SceneTypes) => void,
    showScene: SceneTypes
}) => 
    <Menu data-testid='menu'>
        <Menu.Item header content='Flashcard App'/>
        <Menu.Item content='Answer Flashcards' 
            active={showScene === SceneTypes.answering}
            onClick={() => setShowScene(SceneTypes.answering)}/>
    </Menu>

export default NavBar;