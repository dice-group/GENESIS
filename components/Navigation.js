import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import {view} from 'react-easy-state';
import {getSuggestions} from '../stores/search';
import typeaheadStore, {getSuggestions as getTypeahead, clearSuggestions as clearTypeahead} from '../stores/typeahead';
import GithubIcon from './GithubIcon';

export default view(
  class Navigation extends React.Component {
    state = {
      showTypeahead: false,
    };

    resetTypeahead() {
      this.setState({showTypeahead: false});
      this.search.value = '';
      clearTypeahead();
    }

    handleInput = e => {
      e.preventDefault();
      if (e.key === 'Escape') {
        this.setState({showTypeahead: false});
        return;
      }
      if (e.target.value.length === 0) {
        this.resetTypeahead();
        return;
      }
      if (e.key === 'Enter') {
        getSuggestions(e.target.value);
        this.resetTypeahead();
        Router.push('/');
        return;
      }

      this.setState({showTypeahead: true});
      getTypeahead(e.target.value);
    };

    handleResource(item) {
      const {url, title} = item;
      this.resetTypeahead();
      // clearAll();
      // browserHistory.push({
      // pathname: '/resource',
      // search: `?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      // state: item,
      // });
    }

    render() {
      const {showTypeahead} = this.state;
      const {results: typeahead} = typeaheadStore;

      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <style jsx>{`
            .navbar-collapse.searchHolder {
              display: flex !important;
              flex-direction: row;
            }
          `}</style>
          <style jsx>{`
            .searchFlex {
              flex: 1;
            }

            .searchInput {
              width: 100% !important;
            }

            .typeahead {
              position: absolute;
              width: 80%;
              max-height: 210px;
              margin-left: calc(10%);
              overflow: auto;
            }
          `}</style>
          <Link href="/">
            <a className="navbar-brand">Genesis</a>
          </Link>
          <div className="collapse navbar-collapse searchHolder">
            <div className="navbar-form navbar-left searchFlex">
              <div className="form-group searchInput">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control searchInput"
                  ref={s => {
                    this.search = s;
                  }}
                  onKeyUp={this.handleInput}
                />
                <div
                  className="dropdown-menu typeahead"
                  style={{
                    display: showTypeahead && typeahead && typeahead.length > 0 ? 'block' : 'none',
                  }}>
                  {typeahead.slice(0, 10).map(res => (
                    <div className="dropdown-item" key={res.url}>
                      <Link
                        href={{
                          pathname: '/resource',
                          query: {resource: res.url, title: res.title},
                        }}>
                        <a>{res.title}</a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="https://github.com/dice-group/GENESIS" className="hint--left" data-hint="Grab the source code">
                  <GithubIcon />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
);
