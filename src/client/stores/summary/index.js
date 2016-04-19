// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getSummary} from './get';
import {status} from './status';

// create store
const summary$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        summary: '',
        status: 'init',
    },
});

const clearSummary = summary$.clear;

export {getSummary, clearSummary};
export default summary$;
