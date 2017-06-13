// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getRelatedEntities} from './get';
import {status} from './status';

// create store
const relatedEntities$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        relatedEntities: [],
        status: 'init',
    },
});

export {getRelatedEntities};
export default relatedEntities$;
