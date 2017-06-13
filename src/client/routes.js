import React from 'react';
import {IndexRoute, Route} from 'react-router';

// pages
import Home from './pages/home';
import Resource from './pages/resource';

export default [
    <IndexRoute key="home" name="home" component={Home} />,
    <Route key="resource" name="resource" path="/resource" component={Resource} />,
];
