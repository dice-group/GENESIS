import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {relatedAPI} from '../config';

// create store
const relatedStore = store({
  relatedEntities: [],
  currentUrl: false,
  status: 'init',
});

export const getRelated = async url => {
  if (relatedStore.currentUrl === url) {
    return;
  }
  relatedStore.currentUrl = url;
  relatedStore.status = 'loading';
  const relatedEntities = await fetchival(relatedAPI)
    .post({url})
    .then(({relatedEntities: res}) => res)
    .catch(e => ({error: e}));
  relatedStore.relatedEntities = relatedEntities;
  relatedStore.status = 'done';
};

export const clearRelated = () => {
  relatedStore.relatedEntities = [];
};

export default relatedStore;
