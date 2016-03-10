import {fromJS} from 'immutable';

const searchState = fromJS({
    disambiguation: '',
    status: 'init',
});

export default searchState;
