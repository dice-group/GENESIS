import {createAction} from '../util';
import defaultState from './defaultstate';

const clearImages = createAction();

export {clearImages};
export default clearImages.$
    .map(() => defaultState);
