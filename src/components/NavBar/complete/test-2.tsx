import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from './index';
import { SceneTypes } from '../../types';

afterEach(cleanup);

const renderNavBar = (setShowScene?: (scene: SceneTypes) => void) => render(
    <NavBar 
        showScene={SceneTypes.answering} 
        setShowScene={setShowScene ? setShowScene : (scene: SceneTypes) => undefined}
    />);

//has a menu component
it('has a menu', () => {
    const { getByTestId } = renderNavBar()
    const menu = getByTestId('menu')
    expect(menu).toBeInTheDocument();
});

//has a header
it('has a header', () => {
    const { getByText } = renderNavBar();
    const header = getByText(/flashcard app/i);
    expect(header).toBeInTheDocument();
});

//has a menu item button that loads the answering scene
//clicking answer invokes setShowScene
//has a menu item button that loads the writing scene
//clicking edit invokes setShowScene
