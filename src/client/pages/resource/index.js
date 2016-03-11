import React from 'react';
import render from './render';
import description$, {getDescription} from '../../stores/description';
import disambiguation$, {getDisambiguation} from '../../stores/disambiguation';
import images$, {getImages} from '../../stores/images';
import videos$, {getVideos} from '../../stores/videos';

const Resource = React.createClass({
    getInitialState() {
        return {
            description: '',
            disambiguation: '',
            images: [],
            videos: [],
        };
    },

    componentWillMount() {
        this.subs = [
            description$
                .map(v => v.get('description'))
                .subscribe(description => this.setState({description})),
            disambiguation$
                .map(v => v.get('disambiguation'))
                .do(disambiguation => getImages(disambiguation))
                .do(disambiguation => getVideos(disambiguation))
                .subscribe(disambiguation => this.setState({disambiguation})),
            images$
                .map(v => v.get('images'))
                .subscribe(images => this.setState({images})),
            videos$
                .map(v => v.get('videos'))
                .subscribe(videos => this.setState({videos})),
        ];
    },
    componentWillUnmount() {
        this.subs.map(s => s.dispose());
    },
    componentDidMount() {
        const {url} = this.props.params;
        getDescription(url);
        getDisambiguation(url);
    },

    render,
});

export default Resource;
