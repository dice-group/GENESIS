import {fromJS} from 'immutable';
import React from 'react';
import {Link} from 'react-router';
import styles from './navigation.css';
import search$, {getSuggestions} from '../../stores/search';

const Navigation = React.createClass({
    getInitialState() {
        return {search: fromJS({})};
    },

    componentWillMount() {
        this.searchSub = search$.subscribe(search => this.setState({search}));
    },
    componentWillUnmount() {
        this.searchSub.dispose();
    },

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">LDB</Link>
                </div>
                <div className={`collapse navbar-collapse ${styles.searchHolder}`}>
                    <div className={`navbar-form navbar-left ${styles.searchFlex}`}>
                        <div className={`form-group ${styles.searchInput}`}>
                            <input
                                type="text"
                                placeholder="Search"
                                className={`form-control ${styles.searchInput}`}
                                onKeyUp={getSuggestions}
                            />
                        </div>
                    </div>
                </div>
            </nav>
        );
    },
});

export default Navigation;
