import React, { useState } from 'react';
import './App.css';
import Answering from './scenes/Answering';
import Writing from './scenes/Writing';
import { CardProvider } from './services/CardContext';
import { StatsProvider } from './services/StatsContext';
import { SceneTypes } from './types';
import NavBar from './components/NavBar';
import Selector from './components/Selector';

const App: React.FC = () => {
  
  const [showScene, setShowScene] = useState(SceneTypes.answering);
  
    return (
      <CardProvider>
        <StatsProvider>
          <NavBar showScene={showScene} setShowScene={setShowScene} />
          <Selector/>
          {showScene === SceneTypes.answering && <Answering />}
          {showScene === SceneTypes.writing && <Writing/>}
        </StatsProvider>
      </CardProvider>
    )};

export default App;