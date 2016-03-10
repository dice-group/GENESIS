import React from 'react';
import render from './render';
import description$, {getDescription} from '../../stores/description';
import disambiguation$, {getDisambiguation} from '../../stores/disambiguation';

const Resource = React.createClass({
    getInitialState() {
        return {
            description: '',
        };
    },

    componentWillMount() {
        this.descSub = description$
            .map(v => v.get('description'))
            .subscribe(description => this.setState({description}));
        this.disambSub = disambiguation$
            .map(v => v.get('disambiguation'))
            .subscribe(disambiguation => this.setState({disambiguation}));
    },
    componentWillUnmount() {
        this.descSub.dispose();
        this.disambSub.dispose();
    },
    componentDidMount() {
        const {url} = this.props.params;
        getDescription(url);
        getDisambiguation(url);
    },

    render,
});

export default Resource;
