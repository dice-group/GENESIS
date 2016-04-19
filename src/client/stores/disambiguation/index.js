// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getDisambiguation} from './get';
import {status} from './status';

// create store
const disambiguation$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        disambiguation: [],
        status: 'init',
    },
});

export {getDisambiguation};
export default disambiguation$;
