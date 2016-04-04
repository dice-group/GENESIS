import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getVideos} from './get';

// create result store stream
const subj = new ReplaySubject(1);

// plug in actions
get$.subscribe(subj);

// default state
const videos$ = subj.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getVideos};
export default videos$;
