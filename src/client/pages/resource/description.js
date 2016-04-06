import React from 'react';
// import styles from './resource.css';

export default ({description}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Description
        </div>
        <div className="panel-body">
            {description}
        </div>
    </div>
);
