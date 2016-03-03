import {fromJS} from 'immutable';

const typeaheadState = fromJS({
    typeahead: [],
    status: 'init',
});

export default typeaheadState;
