import {createAction} from '../util';
import defaultState from './defaultstate';

const clearLocation = createAction();

export {clearLocation};
export default clearLocation.$
    .map(() => defaultState);
