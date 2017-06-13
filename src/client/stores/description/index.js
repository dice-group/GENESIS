// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getDescription} from './get';
import {status} from './status';

// create store
const description$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        description: {},
        status: 'init',
    },
});

const clearDescription = description$.clear;

// export
export {getDescription, clearDescription};
export default description$;
