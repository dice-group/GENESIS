import React from 'react';
import render from './render';
import description$, {getDescription} from '../../stores/description';
import disambiguation$, {getDisambiguation} from '../../stores/disambiguation';
import summary$, {getSummary} from '../../stores/summary';
import images$, {getImages} from '../../stores/images';
import videos$, {getVideos} from '../../stores/videos';
import similarEntities$, {getSimilarEntities} from '../../stores/similar';
import relatedEntities$, {getRelatedEntities} from '../../stores/related';

const Resource = React.createClass({
    getInitialState() {
        return {
            url: '',
            title: '',
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
            similarEntities$
                .map(v => v.get('similarEntities'))
                .subscribe(similarEntities => this.setState({similarEntities})),
            relatedEntities$
                .map(v => v.get('relatedEntities'))
                .subscribe(relatedEntities => this.setState({relatedEntities})),
            summary$
                .do(v => console.log(v.toJS()))
                .map(v => v.get('summary'))
                .subscribe(summary => this.setState({summary})),
            disambiguation$
                .map(v => v.get('disambiguation'))
                .filter(d => d.size > 2)
                .distinctUntilChanged()
                .do(d => console.log('disambiguation loaded', d.toJS()))
                .do(d => this.loadImages(d))
                .do(d => this.loadVideos(d))
                .subscribe(disambiguation => this.setState({disambiguation})),
            images$
                .map(v => v.get('images'))
                .subscribe(images => this.setState({images})),
            videos$
                .map(v => v.get('videos'))
                .subscribe(videos => this.setState({videos})),
        ];
    },
    componentDidMount() {
        const {url, title} = this.props.location.state || this.props.location.query;
        // store data for latter usage
        this.setState({url, title}); // eslint-disable-line
        // trigger fetching
        getDescription(url);
        getSummary(url);
        getSimilarEntities(url);
        getRelatedEntities(url);
        getDisambiguation(url);
    },
    componentWillUnmount() {
        this.subs.map(s => s.dispose());
    },

    loadImages(disambiguation) {
        getImages(`${this.state.title} ${disambiguation.get(0)}`);
    },
    loadVideos(disambiguation) {
        getVideos(`${this.state.title} ${disambiguation.get(0)}`);
    },

    render,
});

export default Resource;
