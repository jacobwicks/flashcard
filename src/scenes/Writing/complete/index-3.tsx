import React, { 
    useCallback, 
    useContext, 
    useEffect, 
    useState,
} from 'react';

import { 
    Button,
    Container,
    Form,
    Header,
    Input,
    TextArea
} from 'semantic-ui-react';
import { CardContext } from '../../services/CardContext';
import { CardActionTypes } from '../../types';

const Writing = () => 
    <Form>
        <Header as='h3'>Subject</Header> 
        <Input data-testid='subject' name='subject'/>
        <Header as='h3' content='Question'/> 
        <TextArea data-testid='question' name='question'/>
    </Form>
    
export default Writing;