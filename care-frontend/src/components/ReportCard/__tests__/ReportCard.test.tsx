import React from 'react';
import ReactDOM from 'react-dom';
import { ReportCard } from '..';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ReportCard />,
        div);
});