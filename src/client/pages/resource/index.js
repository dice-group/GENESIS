import React from 'react';
import {browserHistory} from 'react-router';
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
                .filter(description => description.count() > 0)
                .distinctUntilChanged()
                .do(description => getAnnotations(description.get('description')))
                .subscribe(description => this.setState({description})),
            similarEntities$
                .subscribe(similarEntities => this.setState({similarEntities})),
            relatedEntities$
                .subscribe(relatedEntities => this.setState({relatedEntities})),
            summary$
                .distinctUntilChanged()
                .subscribe(summary => this.setState({summary})),
            location$
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
                .subscribe(annotations => this.setState({annotations})),
        ];
        // Listen for changes to the current location
        this.historyUnlisten = browserHistory.listen(location => {
            // if navigated to self - trigger data refetch
            if (location.pathname === '/resource') {
                this.loadData(location.query);
            }
        });
    },

    componentWillUnmount() {
        this.subs.map(s => s.dispose());
        this.historyUnlisten();
    },

    loadData({url, title}) {
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
    loadImages(disambiguation) {
        getImages(`${this.state.title} ${disambiguation.get(0)}`);
    },
    loadVideos(disambiguation) {
        getVideos(`${this.state.title} ${disambiguation.get(0)}`);
    },

    render,
});

export default Resource;
