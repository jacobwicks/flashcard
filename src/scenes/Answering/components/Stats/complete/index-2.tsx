import React, { useContext } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { CardContext } from '../../../../services/CardContext';
import { StatsContext } from '../../../../services/StatsContext';

const Stats = () => {

    //declare icon as a variable
    const icon = <Icon data-testid='icon' name='question circle'/>    

return <Popup 
        content="You haven't seen this question before" 
        trigger={icon}
        />
};

export default Stats;