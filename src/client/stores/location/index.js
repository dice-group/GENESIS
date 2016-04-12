import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getLocation} from './get';
import status$ from './status';

// create result store stream
const subj = new ReplaySubject(1);

// plug in actions
get$.subscribe(subj);
status$.subscribe(subj);

// init stream
const location$ = subj.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getLocation};
export default location$;
