import {fromJS} from 'immutable';
import {browserHistory} from 'react-router';
import React from 'react';
import {Link} from 'react-router';
import styles from './navigation.css';
import {getSuggestions} from '../../stores/search';
import typeahead$, {getSuggestions as getTypeahead} from '../../stores/typeahead';

const Navigation = React.createClass({
    getInitialState() {
        return {
            typeahead: fromJS({results: []}),
            showTypeahead: false,
        };
    },

    componentWillMount() {
        this.searchSub = typeahead$.subscribe(typeahead => this.setState({typeahead}));
    },
    componentWillUnmount() {
        this.searchSub.dispose();
    },

    resetTypeahead() {
        this.setState({showTypeahead: false});
        this.refs.search.value = '';
    },

    handleInput(e) {
        e.preventDefault();
        if (e.key === 'Enter') {
            getSuggestions(e);
            this.resetTypeahead();
            return;
        }

        getTypeahead(e);
        this.setState({showTypeahead: true});
    },

    handleResource(item) {
        const {url, title} = item;
        this.resetTypeahead();
        browserHistory.push({
            pathname: '/resource',
            search: `?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
            state: item,
        });
    },

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">Ginseng</Link>
                </div>
                <div className={`collapse navbar-collapse ${styles.searchHolder}`}>
                    <div className={`navbar-form navbar-left ${styles.searchFlex}`}>
                        <div className={`form-group ${styles.searchInput}`}>
                            <input
                                type="text"
                                ref="search"
                                placeholder="Search"
                                className={`form-control ${styles.searchInput}`}
                                onKeyUp={this.handleInput}
                            />
                            <ul
                                className={`dropdown-menu ${styles.typeahead}`}
                                style={{display:
                                    this.state.showTypeahead && this.state.typeahead.get('results').count() > 0 ?
                                    'block' : 'none'}}
                            >
                                {this.state.typeahead.get('results')
                                .toJS().slice(0, 10).map(res => (
                                    <li key={res.url}>
                                        <a href="#" onClick={() => this.handleResource(res)}>
                                            {res.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    },
});

export default Navigation;
