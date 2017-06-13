import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {videosAPI} from '../config';
const {fromPromise} = Observable;

const getVideos = createAction();

const stream = getVideos.$
    .filter(q => q.length > 1)
    .flatMap(q => fromPromise(fetchival(videosAPI).post({q})));

export {getVideos};
export default stream;
