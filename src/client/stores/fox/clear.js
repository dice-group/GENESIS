import {createAction} from '../util';
import defaultState from './defaultstate';

const clearFox = createAction();

export {clearFox};
export default clearFox.$
    .map(() => defaultState);
