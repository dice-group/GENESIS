import React from 'react';
import Spinner from 'react-spinkit';
import styles from './resource.css';

export default ({relatedEntities}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Related entities
        </div>
        <div className={`panel-body ${styles.mediaPanel}`}>
            {relatedEntities.get('status') === 'loading' ? (
                <Spinner spinnerName="cube-grid" noFadeIn />
            ) : (
                relatedEntities.get('relatedEntities').count() > 0 ?
                relatedEntities.get('relatedEntities').map(v => (
                    <div className="col-xs-6 text-center" key={v.get('url')}>
                        <a href={v.get('url')}>
                            <img src={v.get('image')}
                                className="img-responsive img-rounded"
                                alt={v.get('title')}
                            />
                        </a>
                        <a href={v.get('url')}>{v.get('title')}</a>
                    </div>
                )) : 'No related entities found.'
            )}
        </div>
    </div>
);
