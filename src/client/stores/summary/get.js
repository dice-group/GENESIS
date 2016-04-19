import fetchival from 'fetchival';
import {Observable} from 'rx';
import {createAction} from '../util';
import {summaryAPI} from '../config';
import {status} from './status';
const {fromPromise} = Observable;

const getSummary = createAction();

const stream = getSummary.$
    .filter(url => url.length > 1)
    .do(() => status('loading'))
    .flatMap(url =>
        fromPromise(fetchival(summaryAPI).post({url}))
        .catch(() => Observable.return({}))
    )
    .do(() => status('done'));

export {getSummary};
export default stream;
