import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {similarAPI} from '../config';
import {setStatus} from './status';
const {fromPromise} = Observable;

const getSimilarEntities = createAction();

const stream = getSimilarEntities.$
    .filter(url => url.length > 1)
    .do(() => setStatus('loading'))
    .flatMap(url => fromPromise(fetchival(similarAPI).post({url})))
    .map(res => fromJS(res))
    .do(() => setStatus('done'));

export {getSimilarEntities};
export default stream;
