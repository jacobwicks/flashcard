//import React so that we can use JSX
import React, { useState, useContext} from 'react';

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
import { CardActionTypes } from '../../types';

import Answer from './components/Answer';
import Buttons from './components/Buttons';

const Answering = () => {
    //get cards, current index, and dispatch from CardContext
    const { cards, current, dispatch } = useContext(CardContext);

    //get the question from the current card
    const { question } = cards[current];

    const [showAnswer, setShowAnswer] = useState(false);
return (
    <Container data-testid='container'>
         <Header data-testid='question' content={question}/>
         <Button onClick={() => dispatch({type: CardActionTypes.next})}>Skip</Button>
         <Form>
            <TextArea data-testid='textarea'/>
        </Form>
        <Buttons answered={showAnswer} submit={() => setShowAnswer(true)}/>
        <Answer visible={showAnswer}/>
    </Container>
    )}; 

export default Answering;
