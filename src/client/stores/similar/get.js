import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {similarAPI} from '../config';
const {fromPromise} = Observable;

const getSimilarEntities = createAction();

const stream = getSimilarEntities.$
    .filter(url => url.length > 1)
    .flatMap(url => fromPromise(fetchival(similarAPI).post({url})))
    .map(res => fromJS(res));

export {getSimilarEntities};
export default stream;
