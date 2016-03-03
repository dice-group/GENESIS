import React from 'react';
import {Link} from 'react-router';
import styles from './navigation.css';

const Navigation = React.createClass({
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">LDB</Link>
                </div>
                <div className={`collapse navbar-collapse ${styles.searchHolder}`}>
                    <form className={`navbar-form navbar-left ${styles.searchFlex}`}>
                        <div className={`form-group ${styles.searchInput}`}>
                            <input type="text"
                                placeholder="Search"
                                className={`form-control ${styles.searchInput}`} />
                        </div>
                    </form>
                </div>
            </nav>
        );
    },
});

export default Navigation;
