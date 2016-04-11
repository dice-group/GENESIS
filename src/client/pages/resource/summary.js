import React from 'react';
// import styles from './resource.css';

export default ({summary}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Summary
        </div>
        <div className="panel-body">
            {summary}
        </div>
    </div>
);
