import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {imagesAPI} from '../config';
const {fromPromise} = Observable;

const getImages = createAction();

const stream = getImages.$
    .filter(q => q.length > 1)
    .flatMap(q => fromPromise(fetchival(imagesAPI).post({q})))
    .map(res => fromJS(res));

export {getImages};
export default stream;
