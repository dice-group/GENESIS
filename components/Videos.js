import React from 'react';
import {view} from 'react-easy-state';
import {Portal} from 'react-portal';
import YouTube from 'react-youtube';
import videosStore, {getVideos} from '../stores/videos';

export default view(
  class Videos extends React.Component {
    state = {video: false, showLightbox: false};

    showVideo = (e, videoUrl) => {
      e.preventDefault();
      // extract id
      const video = videoUrl.split('v=')[1];
      this.setState({video, showLightbox: true});
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.url === prevState.url) {
        return prevState;
      }
      getVideos(nextProps);
      return {url: nextProps.url};
    }

    render() {
      const {videos} = videosStore;
      const {video, img, showLightbox} = this.state;

      return (
        <div className="card card-default">
          <style jsx>{`
            .mediaPanel {
              max-height: 500px;
              overflow: auto;
            }

            .imageGrid {
              max-height: 100px;
              margin: 10px;
            }

            .lightbox {
              position: fixed;
              display: flex;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              align-items: center;
              justify-content: center;
              z-index: 10000;
            }

            .videoLightbox {
              width: 80%;
              height: 80%;
            }

            .marginedRow {
              margin-bottom: 10px;
            }
          `}</style>

          <div className="card-body">
            <h5 className="card-heading">Videos</h5>
            <div className="card-text mediaPanel">
              {videos.length === 0 && 'No videos available'}
              {videos.map(v => (
                <div className="row marginedRow" key={v.url}>
                  <div className="col-sm-3">
                    <a href="#" onClick={e => this.showVideo(e, v.url)}>
                      <img src={v.image} className="img-fluid rounded" alt={v.title} />
                    </a>
                  </div>
                  <div className="col-sm-9">
                    <a href="#" onClick={e => this.showVideo(e, v.url)}>
                      {v.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {showLightbox && (
              <Portal closeOnEsc closeOnOutsideClick>
                <div className="lightbox" onClick={() => this.setState({showLightbox: false})}>
                  <YouTube videoId={video} className="videoLightbox" />
                </div>
              </Portal>
            )}
          </div>
        </div>
      );
    }
  }
);
