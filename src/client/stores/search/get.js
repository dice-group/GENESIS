import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {searchAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getSuggestions = createAction();

const stream = getSuggestions.$
    .filter(e => e.key === 'Enter')
    .map(e => e.target.value)
    .filter(q => q.length > 1)
    .distinctUntilChanged()
    .do(() => status('loading'))
    .flatMap(q => fromPromise(fetchival(searchAPI).post({q})))
    .map(results => ({results}))
    .do(() => status('done'));

export {getSuggestions};
export default stream;
