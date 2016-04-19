import React from 'react';
import Spinner from 'react-spinkit';
import {navigateTo} from './navigate';
import styles from './resource.css';

export default ({description, annotations}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Description
        </div>
        <div className="panel-body">
            {description.get('status') === 'loading' ? (
                <Spinner spinnerName="cube-grid" noFadeIn />
            ) : annotations.toJS().reduce((desc, ann) =>
                // reduce annotations to array of text items
                ann.beginIndex.reduce((d, index) => {
                    // get start and nex index of annotations
                    const startIndex = parseInt(index, 10);
                    const endIndex = parseInt(ann.endIndex
                        .find(e => (startIndex + ann.name.length) === parseInt(e, 10)), 10);
                    // calculate which item from array contains annotation
                    const itemIndex = d.findIndex((el, idx) => {
                        const start = d.slice(0, idx).reduce((len, it) => len + it.text.length, 0);
                        const end = start + el.text.length;
                        return startIndex >= start && endIndex <= end;
                    });
                    // ignore if not found
                    if (itemIndex === -1) {
                        return d;
                    }

                    // calculate offset based on previous array items length
                    const offset = d.slice(0, itemIndex).reduce((len, it) => len + it.text.length, 0);
                    // get text surrounding annotation
                    const startText = d[itemIndex].text.substring(0, startIndex - offset);
                    const endText = d[itemIndex].text.substring(endIndex - offset);
                    // create new array from surrounding and annotation
                    const newD = [{
                        text: startText,
                    }, {
                        text: ann.name,
                        url: ann.means.replace('dbpedia:', 'http://dbpedia.org/resource/'),
                        highlight: true,
                    }, {
                        text: endText,
                    }];
                    // return new array
                    return [
                        ...d.slice(0, itemIndex),
                        ...newD,
                        ...d.slice(itemIndex + 1, d.length),
                    ];
                }, desc),
            // convert to initial array of objects
            [{
                text: description.get('description', 'No description available.'),
            }])
            // render
            .map((it, i) => (it.highlight ? (
                <a key={i}
                    href="#"
                    onClick={(e) => navigateTo(e, it.url, it.text)}
                    className={`${styles.highlight} hint--top`}
                    data-hint={it.url}
                >
                    {it.text}
                </a>
            ) : it.text))}
        </div>
    </div>
);
