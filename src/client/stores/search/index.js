// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getSuggestions} from './get';
import {status} from './status';

// create store
const search$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        results: [],
        status: 'init',
    },
});

export {getSuggestions};
export default search$;
