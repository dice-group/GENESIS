import {fromJS} from 'immutable';

const searchState = fromJS({
    results: [],
    status: 'init',
});

export default searchState;
