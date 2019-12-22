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

    //stats is truthy, so we can calculate the total
    const total = Object.keys(stats)
    .reduce((acc, cur) => {
        //cast cur to key from the typeof stats
        //which is really the keys of Stats as defined in our src/types.ts file
        const key = cur as keyof typeof stats; 
        //stats[key] is a number
        acc = acc + stats[key];
        return acc;
    }, 0);

    return <Popup
            data-testid='popup'
            content={
                <div>
                    <div>You have seen this question {total} time{total !== 1 && 's'}.</div>
                    <div>You got it right {stats.right}</div>
                    <div>Wrong {stats.wrong}</div>
                    <div>You skipped it {stats.skip}</div> 
                </div>}
            trigger={icon}
            />
};

export default Stats;