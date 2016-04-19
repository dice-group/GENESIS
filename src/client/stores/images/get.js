import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {imagesAPI} from '../config';
const {fromPromise} = Observable;

const getImages = createAction();

const stream = getImages.$
    .filter(q => q.length > 1)
    .flatMap(q => fromPromise(fetchival(imagesAPI).post({q})));

export {getImages};
export default stream;
