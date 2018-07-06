import Link from 'next/link';
import React from 'react';
import {view} from 'react-easy-state';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import searchStore from '../stores/search';

const wrap = body => (
  <Layout>
    <div className="row parentRow">
      <style jsx>{`
        .parentRow {
          padding-top: 20px;
        }

        .centerContent {
          display: flex;
          justify-content: center;
        }
      `}</style>
      <style jsx global>{`
        .centerContent .cube-grid {
          width: 60px;
          height: 60px;
        }
      `}</style>
      <div className="col-sm-8 offset-sm-2">{body}</div>
    </div>
  </Layout>
);

export default view(() => {
  const {status, results} = searchStore;

  if (status === 'loading') {
    return wrap(
      <div className="row centerContent">
        <Spinner />
      </div>
    );
  }

  if (results && results.error) {
    return wrap(
      <div className="row">
        <b>Oops!</b> Looks like DBpedia is having some problems!<br />
        Please check its status <a href="http://dbpedia.org/sparql">here</a> and try again once its working.
      </div>
    );
  }

  if (results && results.length) {
    return wrap(
      <React.Fragment>
        <style jsx>{`
          .paddedRow {
            padding-bottom: 30px;
          }
        `}</style>
        {results.map(it => (
          <div className="row paddedRow" key={it.url}>
            <div className="col-sm-2">
              <img className="img-fluid rounded" src={it.image} alt={it.image} />
            </div>
            <div className="col-sm-10">
              <h4>{it.title}</h4>
              <p>{it.description}</p>
              <Link
                href={{
                  pathname: '/resource',
                  query: {resource: it.url, title: it.title},
                }}>
                <a>Show full details</a>
              </Link>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }

  return wrap(
    <div className="row text-center">
      <h3>
        Welcome to Genesis!<br />
        <small>Try searching for something</small>
      </h3>
    </div>
  );
});
