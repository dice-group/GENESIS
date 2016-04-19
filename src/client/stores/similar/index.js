// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getSimilarEntities} from './get';
import {status} from './status';

// create store
const similarEntities$ = createStore({
    streams: [get$, status.$],
    defaultState: {
        similarEntities: [],
        status: 'init',
    },
});

export {getSimilarEntities};
export default similarEntities$;
