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


const Answering = () => {
    //get cards and current index from CardContext
    const { cards, current } = useContext(CardContext);

    //get the question from the current card
    const { question } = cards[current];

return (
    <Container data-testid='container'>
         <Header data-testid='question' content={question}/>
         <Button>Skip</Button>
         <Form>
            <TextArea data-testid='textarea'/>
        </Form>
        <Button>Submit</Button>
    </Container>
    )}; 

export default Answering;
