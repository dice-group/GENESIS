import React from 'react';
// import styles from './resource.css';

export default function render() {
    return (
        <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
                Resource page for {this.props.params.url}
            </div>
        </div>
    );
}
