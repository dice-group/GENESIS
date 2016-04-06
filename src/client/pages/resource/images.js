import React from 'react';
import styles from './resource.css';

export default ({images}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Images
        </div>
        <div className={`panel-body row ${styles.mediaPanel}`}>
            {images.map(img => (
                <a href={img}>
                    <img src={img}
                        className={`img-responsive img-thumbnail ${styles.imageGrid}`}
                    />
                </a>
            ))}
        </div>
    </div>
);
