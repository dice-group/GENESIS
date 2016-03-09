import {fromJS} from 'immutable';
import React from 'react';
import search$ from '../../stores/search';
import render from './render';

const Home = React.createClass({
    getInitialState() {
        return {search: fromJS({})};
    },

    componentWillMount() {
        this.searchSub = search$.subscribe(search => this.setState({search}));
    },
    componentWillUnmount() {
        this.searchSub.dispose();
    },

    render,
});

export default Home;
