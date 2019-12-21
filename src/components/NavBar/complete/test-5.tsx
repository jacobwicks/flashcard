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
it('has a button to get you to the answering scene', () => {
    const { getByText } = renderNavBar();
    const answering = getByText(/answer/i)
    expect(answering).toBeInTheDocument();
});

//clicking answer invokes setShowScene
it('clicking answer invokes setShowScene', () => {
    const setShowScene = jest.fn();
    const { getByText } = renderNavBar(setShowScene);
    const answering = getByText(/answer/i)

    fireEvent.click(answering);
    expect(setShowScene).toHaveBeenLastCalledWith(SceneTypes.answering);
});

//has a menu item button that loads the writing scene
it('has a button to get you to the writing scene', () => {
    const { getByText } = renderNavBar();
    const writing = getByText(/edit/i)
    expect(writing).toBeInTheDocument();
});

//clicking edit invokes setShowScene
it('clicking edit invokes setShowScene', () => {
    const setShowScene = jest.fn();
    const { getByText } = renderNavBar(setShowScene);
    const writing = getByText(/edit/i)

    fireEvent.click(writing);
    expect(setShowScene).toHaveBeenLastCalledWith(SceneTypes.writing);
});
