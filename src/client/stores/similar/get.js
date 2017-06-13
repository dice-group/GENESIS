import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {similarAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getSimilarEntities = createAction();

const stream = getSimilarEntities.$
    .filter(url => url.length > 1)
    .do(() => status('loading'))
    .flatMap(url => fromPromise(fetchival(similarAPI).post({url})))
    .do(() => status('done'));

export {getSimilarEntities};
export default stream;
