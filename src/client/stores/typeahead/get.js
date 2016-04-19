import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {typeaheadAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getSuggestions = createAction();

const stream = getSuggestions.$
    .map(e => e.target.value)
    .filter(q => q.length > 3)
    .debounce(300)
    .distinctUntilChanged()
    .do(() => status('loading'))
    .flatMap(q => fromPromise(fetchival(typeaheadAPI).post({q})))
    .map(results => ({results}))
    .do(() => status('done'));

export {getSuggestions};
export default stream;
