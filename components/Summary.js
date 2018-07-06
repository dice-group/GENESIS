import React from 'react';
import {view} from 'react-easy-state';
import summaryStore, {getSummary} from '../stores/summary';
import Spinner from './Spinner';

export default view(
  class Summary extends React.Component {
    state = {
      url: '',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.url === prevState.url) {
        return prevState;
      }
      getSummary(nextProps.url);
      return {url: nextProps.url};
    }

    render() {
      const {summary, status} = summaryStore;

      let body = 'No summary available';

      if (status === 'loading') {
        body = <Spinner />;
      }

      if (summary && summary.length) {
        body = summary;
      }

      return (
        <div className="card card-default">
          <style jsx>{`
            .card {
              margin-top: 10px;
            }
          `}</style>
          <div className="card-body">
            <h5 className="card-heading">Summary (Generated automatically)</h5>
            <div className="card-text">{body}</div>
          </div>
        </div>
      );
    }
  }
);
