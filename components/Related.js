import Link from 'next/link';
import React from 'react';
import {view} from 'react-easy-state';
import relatedStore, {getRelated} from '../stores/related';
import Spinner from './Spinner';

export default view(
  class Related extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.url === prevState.url) {
        return prevState;
      }
      getRelated(nextProps.url);
      return {url: nextProps.url};
    }

    render() {
      const {relatedEntities, status} = relatedStore;

      return (
        <div className="card card-default">
          <style jsx>{`
            .mediaPanel {
              max-height: 500px;
              overflow: auto;
            }

            .marginedRow {
              margin-bottom: 10px;
            }

            .relatedImage {
              max-height: 100px;
            }
          `}</style>
          <div className="card-body">
            <h5 className="card-heading">Related entities</h5>
            <div className="card-text mediaPanel">
              {status === 'loading' && <Spinner spinnerName="cube-grid" noFadeIn />}
              {status !== 'loading' && relatedEntities.length === 0 && 'No related entities found.'}
              {status !== 'loading' &&
                relatedEntities.length > 0 &&
                relatedEntities.map(it => (
                  <div className="row marginedRow" key={it.url}>
                    <div className="col-sm-3">
                      <Link
                        href={{
                          pathname: '/resource',
                          query: {resource: it.url, title: it.title},
                        }}>
                        <a>
                          <img src={it.image} className="img-fluid rounded relatedImage" alt={it.title} />
                        </a>
                      </Link>
                    </div>
                    <div className="col-sm-9">
                      <Link
                        href={{
                          pathname: '/resource',
                          query: {resource: it.url, title: it.title},
                        }}>
                        <a>{it.title}</a>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    }
  }
);
