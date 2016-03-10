import React from 'react';
import render from './render';
import description$, {getDescription} from '../../stores/description';

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
    },
    componentWillUnmount() {
        this.descSub.dispose();
    },
    componentDidMount() {
        getDescription(this.props.params.url);
    },

    render,
});

export default Resource;
