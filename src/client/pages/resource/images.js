import React from 'react';
import styles from './resource.css';

export default ({images}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Images
        </div>
        <div className={`panel-body ${styles.mediaPanel}`}>
            {images.count() === 0 && 'No images available'}
            {images.map(img => (
                <a href={img} key={img}>
                    <img src={img}
                        alt={img}
                        className={`img-responsive img-thumbnail ${styles.imageGrid}`}
                    />
                </a>
            )) || 'No images available'}
        </div>
    </div>
);
