import React from 'react';
import Spinner from 'react-spinkit';
import {navigateTo} from './navigate';
import styles from './resource.css';

export default ({relatedEntities}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Related entities
        </div>
        <div className={`panel-body ${styles.mediaPanel}`}>
            {relatedEntities.get('status') === 'loading' && <Spinner spinnerName="cube-grid" noFadeIn />}
            {relatedEntities.get('status') !== 'loading' && (
                relatedEntities.get('relatedEntities').count() > 0 ?
                relatedEntities.get('relatedEntities').map(v => (
                    <div className={`row ${styles.marginedRow}`} key={v.get('url')}>
                        <div className="col-xs-3">
                            <a href="#" onClick={(e) => navigateTo(e, v.get('url'), v.get('title'))}>
                                <img
                                    src={v.get('image')}
                                    className={`img-responsive img-rounded ${styles.relatedImage}`}
                                    alt={v.get('title')}
                                />
                            </a>
                        </div>
                        <div className="col-xs-9">
                            <a href="#" onClick={(e) => navigateTo(e, v.get('url'), v.get('title'))}>
                                {v.get('title')}
                            </a>
                        </div>
                    </div>
                )) : 'No related entities found.'
            )}
        </div>
    </div>
);
