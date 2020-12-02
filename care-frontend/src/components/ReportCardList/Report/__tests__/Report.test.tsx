import React from 'react';
import ReactDOM from 'react-dom';
import { Report } from '..';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Report id={2} content="Empty" group="Soccer" />,
        div);
});