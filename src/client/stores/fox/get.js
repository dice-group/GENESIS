import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {foxAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getAnnotations = createAction();

const stream = getAnnotations.$
    .filter(input => input.length > 1)
    .do(() => status('loading'))
    .flatMap(input =>
        fromPromise(fetchival(foxAPI).post({input}))
        .timeout(10000)
        .catch(() => Observable.return({}))
    )
    .do(() => status('done'));

export {getAnnotations};
export default stream;
