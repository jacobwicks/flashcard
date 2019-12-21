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

const Writing = () => {
    const { dispatch } = useContext(CardContext);

    return (
    <Form 
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const card = new FormData(e.target as HTMLFormElement);
            const answer = card.get('answer') as string;
            const question = card.get('question') as string;
            const subject = card.get('subject') as string;

            dispatch({
                type: CardActionTypes.save,
                answer,
                question,
                subject
            });
        }}>
        <Header as='h3'>Subject</Header> 
        <Input data-testid='subject' name='subject'/>
        <Header as='h3' content='Question'/> 
        <TextArea data-testid='question' name='question'/>
        <Header as='h3' content='Answer'/> 
        <TextArea data-testid='answer' name='answer'/>
        <Button content='Save'/>
    </Form>
)};

export default Writing;