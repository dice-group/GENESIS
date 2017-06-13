// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getLocation} from './get';
import {status} from './status';

// create store
const location$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        location: {},
        status: 'init',
    },
});

const clearLocation = location$.clear;

export {getLocation, clearLocation};
export default location$;
