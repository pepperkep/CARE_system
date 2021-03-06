import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { NavigationBar } from '../components';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Router>
            <Switch>
                <NavigationBar className='link' />
            </Switch>
        </Router>
        ,
        div);
});
