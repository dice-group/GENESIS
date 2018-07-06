import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {summaryAPI} from '../config';

// create store
const summaryStore = store({
  summary: '',
  currentUrl: false,
  status: 'init',
});

export const getSummary = async url => {
  if (summaryStore.currentUrl === url) {
    return;
  }
  summaryStore.currentUrl = url;
  summaryStore.status = 'loading';
  const summary = await fetchival(summaryAPI)
    .post({url})
    .then(({summary: res}) => res)
    .catch(e => ({error: e}));
  summaryStore.summary = summary;
  summaryStore.status = 'done';
};

export const clearSummary = () => {
  summaryStore.summary = '';
};

export default summaryStore;
