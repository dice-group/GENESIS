import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {disambiguationAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getDisambiguation = createAction();

const stream = getDisambiguation.$
    .filter(url => url.length > 1)
    .do(() => status('loading'))
    .flatMap(url => fromPromise(fetchival(disambiguationAPI).post({url})))
    .do(() => status('done'));

export {getDisambiguation};
export default stream;
