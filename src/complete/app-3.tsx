import React from 'react';
import './App.css';
import Answering from './scenes/Answering';
import { CardProvider } from './services/CardContext';

const App: React.FC = () => 
    <CardProvider>
      <Answering />
    </CardProvider>;

export default App;