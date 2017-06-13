import React from 'react';
// import styles from './resource.css';
import Spinner from 'react-spinkit';

export default ({summary}) => {
    let body = 'No summary available';

    if (summary.get('status') === 'loading') {
        body = <Spinner spinnerName="cube-grid" noFadeIn />;
    }

    if (summary.get('summary') && summary.get('summary').length) {
        body = summary.get('summary');
    }

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                Summary (Generated automatically)
            </div>
            <div className="panel-body">
                {body}
            </div>
        </div>
    );
};
