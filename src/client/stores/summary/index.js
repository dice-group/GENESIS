import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getSummary} from './get';
import status$ from './status';
import clear$, {clearSummary} from './clear';

// create result store stream
const subj = new ReplaySubject(1);

// plug in actions
get$.subscribe(subj);
status$.subscribe(subj);
clear$.subscribe(subj);

// init stream
const summary$ = subj.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getSummary, clearSummary};
export default summary$;
