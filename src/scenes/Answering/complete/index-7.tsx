//import React so that we can use JSX
import React, { useContext} from 'react';

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

const Answering = () => {
    //get cards, current index, and dispatch from CardContext
    const { cards, current, dispatch } = useContext(CardContext);

    //get the question from the current card
    const { question } = cards[current];

return (
    <Container data-testid='container' style={{position: 'absolute', left: 200}}>
         <Header data-testid='question' content={question}/>
         <Button onClick={() => dispatch({type: CardActionTypes.next})}>Skip</Button>
         <Form>
            <TextArea data-testid='textarea'/>
        </Form>
        <Button>Submit</Button>
    </Container>
    )}; 

export default Answering;
