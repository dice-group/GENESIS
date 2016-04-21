import {Observable} from 'rx';
import {DOM} from 'rx-dom';
import {createAction} from '../util';
import {foxAPI} from '../config';
import {status} from './status';

const getAnnotations = createAction();

// cancellable request
let req;
const requestWith = (input) => Observable.create(obs => {
    req = DOM.post({
        url: foxAPI,
        body: JSON.stringify({input}),
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        responseType: 'json',
    })
    .map(r => r.response)
    .subscribe(obs);
});

const stream = getAnnotations.$
    .filter(input => input && input.length > 1)
    .do(() => status('loading'))
    .do(() => req && req.dispose && req.dispose())
    .flatMap(input => requestWith(input).catch(() => Observable.return({})))
    .do(() => status('done'));

export {getAnnotations};
export default stream;
