import {fromJS} from 'immutable';
import {browserHistory} from 'react-router';
import React from 'react';
import search$ from '../../stores/search';
import clearAll from '../../stores/util/clearAll';
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

    showResource(it, e) {
        e.preventDefault();
        const item = it.toJS();
        const {url, title} = item;
        clearAll();
        browserHistory.push({
            pathname: '/resource',
            search: `?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
            state: item,
        });
    },

    render,
});

export default Home;
