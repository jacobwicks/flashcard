import React, { useContext } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { CardContext } from '../../../../services/CardContext';
import { StatsContext } from '../../../../services/StatsContext';

const Stats = () => {
    //get cards and current index from CardContext
    const { cards, current } = useContext(CardContext);
    
    //get the current question
    const { question } = cards[current];

    //this is the entire stats context
    const allStats = useContext(StatsContext);

    //stats for the current question
    const stats = allStats[question];   

    //declare icon as a variable
    const icon = <Icon data-testid='icon' name='question circle'/>
    
    if (!stats) return (
    <Popup 
    content="You haven't seen this question before" 
    trigger={icon}
    />);


return <Popup 
        content="There are stats" 
        trigger={icon}
        />
};

export default Stats;