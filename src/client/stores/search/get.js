import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {searchAPI} from '../config';
const {fromPromise} = Observable;

const getSuggestions = createAction();

const stream = getSuggestions.$
    .map(e => e.target.value)
    .filter(q => q.length > 1)
    .debounce(500)
    .distinctUntilChanged()
    .flatMap(q => fromPromise(fetchival(searchAPI).post({q})))
    .map(results => fromJS({results}));

export {getSuggestions};
export default stream;
