import React from 'react';
import ReactDOM from 'react-dom';
import { ResultCard } from '..';
import { Group } from '../../../../interfaces/Group';

const group: Group = {
    id: 0,
    name: 'hello',
    rating: 5
}

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ResultCard group={group} index={0} />,
        div);
});
