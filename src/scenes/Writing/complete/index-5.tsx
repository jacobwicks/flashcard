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
    <Form data-testid='form'>
        <Header as='h3'>Subject</Header> 
        <Input data-testid='subject' name='subject'/>
        <Header as='h3' content='Question'/> 
        <TextArea data-testid='question' name='question'/>
        <Header as='h3' content='Answer'/> 
        <TextArea data-testid='answer' name='answer'/>
        <Button content='Save'/>
    </Form>

export default Writing;