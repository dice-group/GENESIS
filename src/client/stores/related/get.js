import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {relatedAPI} from '../config';
const {fromPromise} = Observable;

const getRelatedEntities = createAction();

const stream = getRelatedEntities.$
    .filter(url => url.length > 1)
    .flatMap(url => fromPromise(fetchival(relatedAPI).post({url})))
    .map(res => fromJS(res));

export {getRelatedEntities};
export default stream;
