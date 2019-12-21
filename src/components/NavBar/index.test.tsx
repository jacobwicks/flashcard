import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from './index';
import { SceneTypes, CardActionTypes } from '../../types';
import { CardContext, CardProvider, initialState } from '../../services/CardContext';

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

it('clicking answer when current index is -1 dispatches next action', () => {
    const dispatch = jest.fn();
    
    const negativeState = {
        ...initialState,
        current: -1,
        dispatch
    };

    const { getByText } = render(    
        <CardContext.Provider value={negativeState}>
            <NavBar 
                showScene={SceneTypes.answering} 
                setShowScene={(scene: SceneTypes) => undefined}/>
        </CardContext.Provider>)

    const answering = getByText(/answer/i);
    fireEvent.click(answering);

    expect(dispatch).toHaveBeenCalledWith({type: CardActionTypes.next})
});