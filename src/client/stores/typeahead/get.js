import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {typeaheadAPI} from '../config';
const {fromPromise} = Observable;

const getSuggestions = createAction();

const stream = getSuggestions.$
    .filter(q => q.length > 1)
    .debounce(400)
    .distinctUntilChanged()
    .flatMap(q => fromPromise(fetchival(typeaheadAPI).post({q})))
    .map(typeahead => fromJS({typeahead}));

export {getSuggestions};
export default stream;
