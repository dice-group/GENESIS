import {createAction} from '../util';
import defaultState from './defaultstate';

const clearVideos = createAction();

export {clearVideos};
export default clearVideos.$
    .map(() => defaultState);
