import React, { Fragment, useContext } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { CardContext } from '../../../../services/CardContext';
import { CardActionTypes } from '../../../../types';

const Subject = ({
    subject
  }: {
    subject: string
  }) =>  {
    const { cards, dispatch, show } = useContext(CardContext);
  
    //true if the subject is in the array show
    const expanded = show.includes(subject);

    //use filter to pull only the cards that have this subject
    const subjectCards = cards
    .filter(card => card.subject === subject)

    //cardsChild will return an array of <Menu.Item/> components
    const cardsChild = subjectCards
    .map(card => {
      const { question } = card;
      return <Menu.Item 
              content={question}
              as='a' 
              key={question}
              onClick={() => dispatch({type: CardActionTypes.select, question})}
            />
        });

    return (
        <Fragment>
            <Menu.Item as='a' onClick={() => dispatch({type: CardActionTypes.showAdd, subject})}> 
                <Icon name='list'/>
                {subject}
            </Menu.Item>
            {expanded && cardsChild}
        </Fragment>
    )};
  
export default Subject;