import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getDisambiguation} from './get';
import status$ from './status';

// create result store stream
const subj = new ReplaySubject(1);

// plug actions
get$.subscribe(subj);
status$.subscribe(subj);

// create stream
const disambiguation$ = subj.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getDisambiguation};
export default disambiguation$;
