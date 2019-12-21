//import React so that we can use JSX
import React, { useState, useContext, useEffect } from 'react';

//import all the components from Semanti UI React
import {
    Button,
    Container,
    Form,
    Header,
    TextArea
} from 'semantic-ui-react'

//CardContext gives us access to the cards
import { CardContext } from '../../services/CardContext';

//The types of action that CardContext can handle
import { CardActionTypes, StatsActionType } from '../../types';

import { StatsContext } from '../../services/StatsContext';

import Answer from './components/Answer';
import Buttons from './components/Buttons';
import Stats from './components/Stats';

const Answering = () => {
    //get cards, current index, and dispatch from CardContext
    const { cards, current, dispatch } = useContext(CardContext);
    //get dispatch from StatsContext
    const { dispatch: statsDispatch } = useContext(StatsContext);

    //get the question from the current card
    const { question } = cards[current];

    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        //hide the answer
        setShowAnswer(false);
        
        //useEffect triggers when the value of current changes
    }, [current, setShowAnswer]);
    
return (
    <Container data-testid='container'>
         <Header data-testid='question'><Stats/>{question}</Header>
         <Button onClick={() => {
            dispatch({type: CardActionTypes.next});
            statsDispatch({type: StatsActionType.skip, question});   
         }}>Skip</Button>
         <Form>
            <TextArea data-testid='textarea'/>
        </Form>
        <Buttons answered={showAnswer} submit={() => setShowAnswer(true)}/>
        <Answer visible={showAnswer}/>
    </Container>
    )}; 

export default Answering;