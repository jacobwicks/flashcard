import React, { Fragment, useContext } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { CardContext } from '../../../../services/CardContext';
import { CardActionTypes } from '../../../../types';

const Subject = ({
    subject
  }: {
    subject: string
  }) => <Menu.Item as='a'>
      <Icon name='list'/>
      {subject}
  </Menu.Item>

export default Subject;