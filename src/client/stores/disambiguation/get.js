import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {disambiguationAPI} from '../config';
import {setStatus} from './status';
const {fromPromise} = Observable;

const getDisambiguation = createAction();

const stream = getDisambiguation.$
    .filter(url => url.length > 1)
    .do(() => setStatus('loading'))
    .flatMap(url => fromPromise(fetchival(disambiguationAPI).post({url})))
    .map(res => fromJS(res))
    .do(() => setStatus('done'));

export {getDisambiguation};
export default stream;
