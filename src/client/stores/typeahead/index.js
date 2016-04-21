// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getSuggestions} from './get';
import {status} from './status';

// create store
const typeahead$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        results: [],
        status: 'init',
    },
});

const clearSuggestions = typeahead$.clear;

export {getSuggestions, clearSuggestions};
export default typeahead$;
