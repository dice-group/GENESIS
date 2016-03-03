import {fromJS} from 'immutable';
import React from 'react';
import {Link} from 'react-router';
import styles from './navigation.css';
import typeahead$, {getSuggestions} from '../../stores/typeahead';

const Navigation = React.createClass({
    getInitialState() {
        return {typeahead: fromJS({})};
    },

    componentWillMount() {
        this.typeaheadSub = typeahead$.subscribe(typeahead => this.setState({typeahead}));
    },
    componentWillUnmount() {
        this.typeaheadSub.dispose();
    },

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
                                className={`form-control ${styles.searchInput}`}
                                onKeyUp={e => getSuggestions(e.target.value)} />
                        </div>
                    </form>
                    {this.state.typeahead.get('typeahead').count() ? (
                    <div className={`dropdown-menu ${styles.typeahead}`}>
                        {this.state.typeahead.get('typeahead').map(it => (
                            <li key={it}>
                                <a onClick={() => {}}>{it}</a>
                            </li>
                        ))}
                    </div>
                    ) : ''}
                </div>
            </nav>
        );
    },
});

export default Navigation;
