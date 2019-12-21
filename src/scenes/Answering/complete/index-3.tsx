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
    <Container data-testid='container'>
        <Header data-testid='question'/>
        <Button>Skip</Button>
    </Container>
    )}; 

export default Answering;
