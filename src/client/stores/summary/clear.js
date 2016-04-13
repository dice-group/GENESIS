import {createAction} from '../util';
import defaultState from './defaultstate';

const clearSummary = createAction();

export {clearSummary};
export default clearSummary.$
    .map(() => defaultState);
