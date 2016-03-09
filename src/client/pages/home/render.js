import React from 'react';
import styles from './home.css';

const renderHello = () => (
    <div className="row text-center">
        <h3>
            Welcome to Linked Data Browser!<br/>
            <small>Try searching for something</small>
        </h3>
    </div>
);

const renderSearch = (state) => state.search.get('results').map(it => (
    <div className={`row ${styles.paddedRow}`} key={it.get('url')}>
        <div className="col-xs-2">
            <img className="img-responsive" src={it.get('image')} />
        </div>
        <div className="col-xs-10">
            <h4>{it.get('title')}</h4>
            <p>{it.get('description')}</p>
            <a onClick={() => console.log(it.toJS())}>Show full details</a>
        </div>
    </div>
));

const chooseRender = (state) => state.search.get('results').count() ? renderSearch(state) : renderHello();

export default function render() {
    return (
        <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
                {chooseRender(this.state)}
            </div>
        </div>
    );
}
