import React from 'react';
import Spinner from 'react-spinkit';
import styles from './home.css';

const renderHello = () => (
    <div className="row text-center">
        <h3>
            Welcome to Linked Data Browser!<br/>
            <small>Try searching for something</small>
        </h3>
    </div>
);

const renderSearch = function() {
    return this.state.search.get('results').map(it => (
        <div className={`row ${styles.paddedRow}`} key={it.get('url')}>
            <div className="col-xs-2">
                <img className="img-responsive" src={it.get('image')} />
            </div>
            <div className="col-xs-10">
                <h4>{it.get('title')}</h4>
                <p>{it.get('description')}</p>
                <a href="#" onClick={this.showResource.bind(this, it)}>Show full details</a>
            </div>
        </div>
    ));
};

const chooseRender = function() {
    if (this.state.search.get('status') === 'loading') {
        return (
            <div className={`row ${styles.centerContent}`}>
                <Spinner spinnerName="cube-grid" noFadeIn />
            </div>
        );
    }

    return this.state.search.get('results').count() ? renderSearch.call(this) : renderHello();
};

export default function render() {
    return (
        <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
                {chooseRender.call(this)}
            </div>
        </div>
    );
}
