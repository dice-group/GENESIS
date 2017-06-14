import React from 'react';
import styles from './resource.css';

export default ({title, url}) => (
    <h3>
        {title || url}
        <a className={`btn btn-default btn-sm ${styles.btnLink}`} href={url}>
            <i className="glyphicon glyphicon-link" />
        </a>
    </h3>
);
