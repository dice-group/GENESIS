// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getAnnotations} from './get';
import {status} from './status';

// create store
const fox$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        annotations: [],
        status: 'init',
    },
});

const clearFox = fox$.clear;

export {getAnnotations, clearFox};
export default fox$;
