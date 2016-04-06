import React from 'react';
import styles from './resource.css';

export default ({videos}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Videos
        </div>
        <div className={`panel-body ${styles.mediaPanel}`}>
            {videos.map(v => (
                <div className="col-xs-6 text-center">
                    <a href={`http://youtube.com${v.get('url')}`}>
                        <img src={v.get('image')}
                            className="img-responsive img-rounded"
                            alt={v.get('title')}
                        />
                    </a>
                    <a href={`http://youtube.com${v.get('url')}`}>{v.get('title')}</a>
                </div>
            ))}
        </div>
    </div>
);
