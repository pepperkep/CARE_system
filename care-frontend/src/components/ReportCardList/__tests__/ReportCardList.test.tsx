import React from 'react';
import ReactDOM from 'react-dom';
import { ReportCardList } from '..';

const reportlist = [{id: 13, userId: 1, content: "Empty", group: "Soccer"}]

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ReportCardList reportList={reportlist} />,
        div);
});