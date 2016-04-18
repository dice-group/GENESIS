import React from 'react';
import render from './render';
import description$, {getDescription} from '../../stores/description';
import disambiguation$, {getDisambiguation} from '../../stores/disambiguation';
import summary$, {getSummary} from '../../stores/summary';
import location$, {getLocation} from '../../stores/location';
import images$, {getImages} from '../../stores/images';
import videos$, {getVideos} from '../../stores/videos';
import similarEntities$, {getSimilarEntities} from '../../stores/similar';
import relatedEntities$, {getRelatedEntities} from '../../stores/related';
import fox$, {getAnnotations} from '../../stores/fox';

const Resource = React.createClass({
    getInitialState() {
        return {
            url: '',
            title: '',
            description: '',
            disambiguation: '',
            summary: '',
            images: [],
            videos: [],
        };
    },

    componentWillMount() {
        this.subs = [
            description$
                .map(v => v.get('description'))
                .distinctUntilChanged()
                .do(description => getAnnotations(description))
                .subscribe(description => this.setState({description})),
            similarEntities$
                .map(v => v.get('similarEntities'))
                .distinctUntilChanged()
                .subscribe(similarEntities => this.setState({similarEntities})),
            relatedEntities$
                .map(v => v.get('relatedEntities'))
                .distinctUntilChanged()
                .subscribe(relatedEntities => this.setState({relatedEntities})),
            summary$
                .distinctUntilChanged()
                .subscribe(summary => this.setState({summary})),
            location$
                .map(v => v.get('location'))
                .distinctUntilChanged()
                .subscribe(location => this.setState({location})),
            disambiguation$
                .map(v => v.get('disambiguation'))
                .filter(d => d.size > 2)
                .distinctUntilChanged()
                .do(d => this.loadImages(d))
                .do(d => this.loadVideos(d))
                .subscribe(disambiguation => this.setState({disambiguation})),
            images$
                .map(v => v.get('images'))
                .distinctUntilChanged()
                .subscribe(images => this.setState({images})),
            videos$
                .map(v => v.get('videos'))
                .distinctUntilChanged()
                .subscribe(videos => this.setState({videos})),
            fox$
                .map(v => v.get('annotations'))
                .subscribe(annotations => this.setState({annotations}))
        ];
    },
    componentDidMount() {
        const {url, title} = this.props.location.state || this.props.location.query;
        // store data for latter usage
        this.setState({url, title}); // eslint-disable-line
        // trigger fetching
        getDescription(url);
        getSummary(url);
        getLocation(url);
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
