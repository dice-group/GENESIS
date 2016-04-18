import React from 'react';
import styles from './resource.css';

export default ({description, annotations}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Description
        </div>
        <div className="panel-body">
            {annotations.toJS().reduce((desc, ann) =>
                // reduce annotations to array of text items
                ann.beginIndex.reduce((d, index, i) => {
                    // get start and nex index of annotations
                    const startIndex = parseInt(index, 10);
                    const endIndex = parseInt(ann.endIndex[i], 10);
                    // calculate which item from array contains annotation
                    const itemIndex = d.findIndex((el, idx) => {
                        const start = d.slice(0, idx).reduce((len, it) => len + it.size, 0);
                        const end = start + el.size;
                        return startIndex >= start && endIndex <= end;
                    });
                    // ignore if not found
                    if (itemIndex === -1) {
                        return d;
                    }

                    // calculate offset based on previous array items length
                    const offset = d.slice(0, itemIndex).reduce((len, it) => len + it.size, 0);
                    // get text surrounding annotation
                    const startText = d[itemIndex].text.substring(0, startIndex - offset);
                    const endText = d[itemIndex].text.substring(endIndex - offset);
                    // create new array from surrounding and annotation
                    const newD = [{
                        text: startText,
                        size: startText.length,
                    }, {
                        text: ann.name,
                        size: ann.name.length,
                        highlight: true,
                    }, {
                        text: endText,
                        size: endText.length,
                    }];
                    // replace original item with new one
                    d.splice(itemIndex, 1, ...newD);
                    // return new array
                    return d;
                }, desc),
            // convert to initial array of objects
            [{
                text: description,
                size: description.length,
            }])
            // render
            .map((it, i) => (it.highlight ? (
                <span key={i} className={styles.highlight}>{it.text}</span>
            ) : it.text))}
        </div>
    </div>
);
