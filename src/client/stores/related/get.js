import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {relatedAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getRelatedEntities = createAction();

const stream = getRelatedEntities.$
    .filter(url => url.length > 1)
    .do(() => status('loading'))
    .flatMap(url => fromPromise(fetchival(relatedAPI).post({url})))
    .do(() => status('done'));

export {getRelatedEntities};
export default stream;
