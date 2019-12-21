import React from 'react';
import './App.css';
import Answering from './scenes/Answering';
import { CardProvider } from './services/CardContext';
import { StatsProvider } from './services/StatsContext';

const App: React.FC = () => 
    <CardProvider>
      <StatsProvider>
        <Answering />
      </StatsProvider>
    </CardProvider>

export default App;