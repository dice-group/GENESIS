import fetchival from 'fetchival';
import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import {summaryAPI} from '../config';
import {setStatus} from './status';
const {fromPromise} = Observable;

const getSummary = createAction();

const stream = getSummary.$
    .filter(url => url.length > 1)
    .do(() => setStatus('loading'))
    .flatMap(url => fromPromise(fetchival(summaryAPI).post({url})))
    .map(summary => fromJS({summary}))
    .do(() => setStatus('done'));

export {getSummary};
export default stream;
