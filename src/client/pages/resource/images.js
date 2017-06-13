import React from 'react';
import Portal from 'react-portal';
import styles from './resource.css';

const Images = React.createClass({
    getInitialState() {
        return {
            showLightbox: false,
        };
    },

    showImage(e, img) {
        e.preventDefault();
        this.setState({img, showLightbox: true});
    },

    render() {
        const {images} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Images
                </div>
                <div className={`panel-body ${styles.mediaPanel}`}>
                    {images.count() === 0 && 'No images available'}
                    {images.map(img => (
                        <a href="#" onClick={(e) => this.showImage(e, img)} key={img}>
                            <img
                                src={img}
                                alt={img}
                                className={`img-responsive img-thumbnail ${styles.imageGrid}`}
                            />
                        </a>
                    )) || 'No images available'}
                </div>
                <Portal closeOnEsc closeOnOutsideClick isOpened={this.state.showLightbox}>
                    <div className={styles.lightbox} onClick={() => this.setState({showLightbox: false})}>
                        <img
                            className={`img-responsive ${styles.imageLightbox}`}
                            alt={this.state.img}
                            src={this.state.img}
                        />
                    </div>
                </Portal>
            </div>
        );
    },
});

export default Images;
