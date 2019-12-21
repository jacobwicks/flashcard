import React from 'react';
import { Menu } from 'semantic-ui-react';
import { SceneTypes } from '../../types';

const NavBar = ({
    setShowScene,
    showScene
}:{
    setShowScene: (scene: SceneTypes) => void,
    showScene: SceneTypes
}) => <Menu data-testid='menu'/>

export default NavBar;