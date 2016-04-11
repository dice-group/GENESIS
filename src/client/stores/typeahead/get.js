import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {typeaheadAPI} from '../config';
import {setStatus} from './status';
const {fromPromise} = Observable;

const getSuggestions = createAction();

const stream = getSuggestions.$
    .map(e => e.target.value)
    .filter(q => q.length > 1)
    .debounce(300)
    .distinctUntilChanged()
    .do(() => setStatus('loading'))
    .flatMap(q => fromPromise(fetchival(typeaheadAPI).post({q})))
    .map(results => fromJS({results}))
    .do(() => setStatus('done'));

export {getSuggestions};
export default stream;
