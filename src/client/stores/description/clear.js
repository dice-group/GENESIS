import {createAction} from '../util';
import defaultState from './defaultstate';

const clearDescription = createAction();

export {clearDescription};
export default clearDescription.$
    .map(() => defaultState);
