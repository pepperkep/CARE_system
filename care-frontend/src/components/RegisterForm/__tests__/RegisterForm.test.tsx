import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { RegisterForm } from '../../../components';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Router>
            <Switch>
                <RegisterForm />
            </Switch>
        </Router>
        ,
        div);
});
