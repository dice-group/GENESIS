import React from 'react';
import styles from './resource.css';

export default ({similarEntities}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Similar entities
        </div>
        <div className={`panel-body ${styles.mediaPanel}`}>
            {similarEntities.count() > 0 ? similarEntities.map(v => (
                <div className="col-xs-6 text-center" key={v.get('url')}>
                    <a href={v.get('url')}>
                        <img src={v.get('image')}
                            className="img-responsive img-rounded"
                            alt={v.get('title')}
                        />
                    </a>
                    <a href={v.get('url')}>{v.get('title')}</a>
                </div>
            )) : 'No similar entities found.'}
        </div>
    </div>
);
