import React from 'react';
import Portal from 'react-portal';
import YouTube from 'react-youtube';
import styles from './resource.css';

const Videos = React.createClass({
    getInitialState() {
        return {
            showLightbox: false,
        };
    },

    showVideo(e, videoUrl) {
        e.preventDefault();
        // extract id
        const video = videoUrl.split('v=')[1];
        this.setState({video, showLightbox: true});
    },

    render() {
        const {videos} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Videos
                </div>
                <div className={`panel-body ${styles.mediaPanel}`}>
                    {videos.count() === 0 && 'No videos available'}
                    {videos.map(v => (
                        <div className="col-xs-6 text-center" key={v.get('url')}>
                            <a href="#" onClick={(e) => this.showVideo(e, v.get('url'))}>
                                <img
                                    src={v.get('image')}
                                    className="img-responsive img-rounded"
                                    alt={v.get('title')}
                                />
                            </a>
                            <a href="#" onClick={(e) => this.showVideo(e, v.get('url'))}>{v.get('title')}</a>
                        </div>
                    ))}
                </div>
                <Portal closeOnEsc closeOnOutsideClick isOpened={this.state.showLightbox}>
                    <div className={styles.lightbox} onClick={() => this.setState({showLightbox: false})}>
                        <YouTube
                            videoId={this.state.video}
                            className={styles.videoLightbox}
                            alt={this.state.img}
                            src={this.state.img}
                        />
                    </div>
                </Portal>
            </div>
        );
    },
});

export default Videos;
