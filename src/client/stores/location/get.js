import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {locationAPI} from '../config';
import {setStatus} from './status';
const {fromPromise} = Observable;

const getLocation = createAction();

const stream = getLocation.$
    .filter(url => url.length > 1)
    .do(() => setStatus('loading'))
    .flatMap(url =>
        fromPromise(fetchival(locationAPI).post({url}))
        .catch(() => Observable.return({}))
    )
    .map(res => fromJS(res))
    .do(() => setStatus('done'));

export {getLocation};
export default stream;
