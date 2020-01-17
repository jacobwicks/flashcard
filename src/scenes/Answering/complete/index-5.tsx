//import React so that we can use JSX
import React from 'react';

//import all the components from Semanti UI React
import {
    Button,
    Container,
    Form,
    Header,
    TextArea
} from 'semantic-ui-react'

const Answering = () => {
return (
    <Container data-testid='container' style={{position: 'absolute', left: 200}}>
        <Header data-testid='question'/>
        <Button>Skip</Button>
        <Form>
            <TextArea data-testid='textarea'/>
        </Form>
        <Button>Submit</Button>
    </Container>
    )}; 

export default Answering;
