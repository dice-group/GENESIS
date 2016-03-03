import {ReplaySubject} from 'rx';
import defaultState from './defaultstate';

// actions
import get$, {getSuggestions} from './get';

// create result store stream
const typeahead = new ReplaySubject(1)
// plug in actions
.merge(get$)
// default state
.startWith(defaultState)
// combine results
.scan((state, data) => state.merge(data));

export {getSuggestions};
export default typeahead;
