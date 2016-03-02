import React from 'react';
import {IndexRoute} from 'react-router';

// pages
import Home from './pages/home';

export default [
    <IndexRoute key="home" name="home" component={Home} />,
];
