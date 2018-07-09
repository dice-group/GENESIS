import Link from 'next/link';
import React from 'react';
import {view} from 'react-easy-state';
import descriptionStore, {getDescription} from '../stores/description';
import foxStore from '../stores/fox';
import Spinner from './Spinner';

export default view(
  class Description extends React.Component {
    state = {
      url: '',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.url === prevState.url) {
        return prevState;
      }
      getDescription(nextProps.url);
      return {url: nextProps.url};
    }

    generateDescription = () => {
      const {description} = descriptionStore;
      const {annotations} = foxStore;

      if (!annotations || !Array.isArray(annotations)) {
        return '';
      }

      const initialText = [
        {
          text: (description && description.description) || 'No description available.',
        },
      ];

      return annotations
        .reduce((desc, ann) => {
          // get start and nex index of annotations
          const startIndex = parseInt(ann.beginIndex, 10);
          const endIndex = parseInt(ann.endIndex, 10);
          // calculate which item from array contains annotation
          const itemIndex = desc.findIndex((el, idx) => {
            const start = desc.slice(0, idx).reduce((len, it) => len + it.text.length, 0);
            const end = start + el.text.length;
            return startIndex >= start && endIndex <= end;
          });
          // ignore if not found
          if (itemIndex === -1) {
            return desc;
          }

          // calculate offset based on previous array items length
          const offset = desc.slice(0, itemIndex).reduce((len, it) => len + it.text.length, 0);
          // get text surrounding annotation
          const startText = desc[itemIndex].text.substring(0, startIndex - offset);
          const endText = desc[itemIndex].text.substring(endIndex - offset);
          // create new array from surrounding and annotation
          const newD = [
            {
              text: startText,
            },
            {
              text: ann.name,
              url: ann.url.replace('dbr:', 'http://dbpedia.org/resource/'),
              highlight: true,
            },
            {
              text: endText,
            },
          ];
          // return new array
          return [...desc.slice(0, itemIndex), ...newD, ...desc.slice(itemIndex + 1, desc.length)];
        }, initialText)
        .map((it, i) => {
          if (!it.highlight) {
            return it.text;
          }
          return (
            <Link
              key={`${it.url}_${i}`}
              href={{
                pathname: '/resource',
                query: {resource: it.url, title: it.text},
              }}>
              <a className="highlight hint--top" data-hint={it.url}>
                {it.text}
              </a>
            </Link>
          );
        });
    };

    render() {
      const {status, description} = descriptionStore;

      return (
        <div className="card card-default">
          <style jsx global>{`
            .highlight {
              color: inherit;
              text-decoration: underline !important;
              cursor: pointer;
            }
          `}</style>
          <div className="card-body">
            <div className="card-title">
              <h5>Description</h5>
              <div className="pull-right hint--top" data-hint="Loading annotations...">
                {status === 'loading' && <Spinner />}
              </div>
            </div>
            <div className="card-text">
              <div className="row">
                <div className={description && description.image ? 'col-sm-8' : 'col-sm-12'}>
                  {status === 'loading' && <Spinner spinnerName="cube-grid" noFadeIn />}
                  {this.generateDescription()}
                </div>
                {description &&
                  description.image && (
                    <div className="col-sm-4">
                      <img className="img-fluid" src={description.image} alt={description.image} />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
