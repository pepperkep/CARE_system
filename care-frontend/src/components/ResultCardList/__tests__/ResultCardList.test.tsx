import React from 'react';
import ReactDOM from 'react-dom';
import { ResultCardList } from '..';

const grouplist = [{group_id: 1, name: "Matt", description: "Student"}]

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ResultCardList groupList={grouplist} />,
        div);
});