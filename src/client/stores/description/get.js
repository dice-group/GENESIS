import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {descriptionAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getDescription = createAction();

const stream = getDescription.$
    .filter(url => url.length > 1)
    .do(() => status('loading'))
    .flatMap(url => fromPromise(fetchival(descriptionAPI).post({url})))
    .do(() => status('done'));

export {getDescription};
export default stream;
