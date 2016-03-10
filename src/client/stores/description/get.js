import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {descriptionAPI} from '../config';
const {fromPromise} = Observable;

const getDescription = createAction();

const stream = getDescription.$
    .filter(url => url.length > 1)
    .flatMap(url => fromPromise(fetchival(descriptionAPI).post({url})))
    .map(res => fromJS(res));

export {getDescription};
export default stream;
