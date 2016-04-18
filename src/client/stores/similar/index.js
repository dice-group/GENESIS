import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getSimilarEntities} from './get';
import status$ from './status';

// create result store stream
const subj = new ReplaySubject(1);

// plug in actions
get$.subscribe(subj);
status$.subscribe(subj);

// default state
const similarEntities$ = subj.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getSimilarEntities};
export default similarEntities$;
