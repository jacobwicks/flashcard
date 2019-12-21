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
    const { cards, current, dispatch } = useContext(CardContext);
   
    //a reference to the current card object
    const card = cards[current];

    //useState hooks to store the value of the three input fields
    const [question, setQuestion ] = useState(card ? card.question : '')
    const [answer, setAnswer ] = useState(card ? card.answer : '')
    const [subject, setSubject ] = useState(card ? card.subject : '');

    return (
        <Container style={{position: 'absolute', left: 200}}>
            <Button content='New Card'/>
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
                <Input data-testid='subject' name='subject'
                    onChange={(e, { value }) => setSubject(value)}
                    value={subject}/>
                <Header as='h3' content='Question'/> 
                <TextArea data-testid='question' name='question'
                    onChange={(e, { value }) => setQuestion(value!.toString())}
                    value={question}/>
                <Header as='h3' content='Answer'/> 
                <TextArea data-testid='answer' name='answer'
                    onChange={(e, { value }) => setAnswer(value!.toString())}
                    value={answer}/>
                <Button content='Save'/>
            </Form>
        </Container>
    )};

export default Writing;