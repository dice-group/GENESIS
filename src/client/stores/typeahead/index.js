import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getSuggestions} from './get';
import status$ from './status';

// store subject
const subj = new ReplaySubject(1);

// plug actions
get$.subscribe(subj);
status$.subscribe(subj);

// create result store stream
const typeahead$ = subj.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getSuggestions};
export default typeahead$;
