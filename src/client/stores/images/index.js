import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getImages} from './get';

// create result store stream
const subj = new ReplaySubject(1);

// plug in actions
get$.subscribe(subj);

// default state
const images$ = subj.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getImages};
export default images$;
