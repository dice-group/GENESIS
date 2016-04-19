import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {locationAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getLocation = createAction();

const stream = getLocation.$
    .filter(url => url.length > 1)
    .do(() => status('loading'))
    .flatMap(url =>
        fromPromise(fetchival(locationAPI).post({url}))
        .catch(() => Observable.return({}))
    )
    .do(() => status('done'));

export {getLocation};
export default stream;
