import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getDescription} from './get';
import status$ from './status';
import clear$, {clearDescription} from './clear';

// create result store stream
const subj = new ReplaySubject(1);

// plug in actions
get$.subscribe(subj);
status$.subscribe(subj);
clear$.subscribe(subj);

// init stream
const description$ = subj.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getDescription, clearDescription};
export default description$;
