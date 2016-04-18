import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {relatedAPI} from '../config';
import {setStatus} from './status';
const {fromPromise} = Observable;

const getRelatedEntities = createAction();

const stream = getRelatedEntities.$
    .filter(url => url.length > 1)
    .do(() => setStatus('loading'))
    .flatMap(url => fromPromise(fetchival(relatedAPI).post({url})))
    .map(res => fromJS(res))
    .do(() => setStatus('done'));

export {getRelatedEntities};
export default stream;
