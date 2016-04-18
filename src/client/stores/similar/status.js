import {fromJS} from 'immutable';
import {createAction} from '../util';

const setStatus = createAction();

const stream = setStatus.$
    .filter(s => s.length > 1)
    .distinctUntilChanged()
    .map(status => fromJS({status}));

export {setStatus};
export default stream;
