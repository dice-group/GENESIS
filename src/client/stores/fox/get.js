import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {foxAPI} from '../config';
import {setStatus} from './status';
const {fromPromise} = Observable;

const getAnnotations = createAction();

const stream = getAnnotations.$
    .filter(input => input.length > 1)
    .do(() => setStatus('loading'))
    .flatMap(input => fromPromise(fetchival(foxAPI).post({input})))
    .map(res => fromJS(res))
    .do(() => setStatus('done'));

export {getAnnotations};
export default stream;
