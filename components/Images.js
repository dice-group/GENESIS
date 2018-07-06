import React from 'react';
import {view} from 'react-easy-state';
import {Portal} from 'react-portal';
import imagesStore, {getImages} from '../stores/images';

export default view(
  class Images extends React.Component {
    state = {image: false, showLightbox: false};

    showImage(e, image) {
      e.preventDefault();
      this.setState({image, showLightbox: true});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.url === prevState.url) {
        return prevState;
      }
      getImages(nextProps);
      return {url: nextProps.url};
    }

    render() {
      const {images} = imagesStore;
      const {image, showLightbox} = this.state;

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

            .imageLightbox {
              max-width: 80%;
              max-height: 80%;
            }
          `}</style>
          <div className="card-body">
            <div className="card-heading">Images</div>
            <div className="card-text mediaPanel">
              {images.length === 0 && 'No images available'}
              {images.map(img => (
                <a href="#" onClick={e => this.showImage(e, img.url)} key={img.url}>
                  <img src={img.url} alt={img.url} className="img-fluid img-thumbnail imageGrid" />
                </a>
              )) || 'No images available'}
            </div>
            {showLightbox && (
              <Portal closeOnEsc closeOnOutsideClick>
                <div className="lightbox" onClick={() => this.setState({showLightbox: false})}>
                  <img className="img-fluid imageLightbox" alt={image} src={image} />
                </div>
              </Portal>
            )}
          </div>
        </div>
      );
    }
  }
);
