import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {similarAPI} from '../config';

// create store
const similarStore = store({
  similarEntities: [],
  currentUrl: false,
  status: 'init',
});

export const getSimilar = async url => {
  if (similarStore.currentUrl === url) {
    return;
  }
  similarStore.currentUrl = url;
  similarStore.status = 'loading';
  const similarEntities = await fetchival(similarAPI)
    .post({url})
    .then(({similarEntities: res}) => res)
    .catch(e => ({error: e}));
  similarStore.similarEntities = similarEntities;
  similarStore.status = 'done';
};

export const clearSimilar = () => {
  similarStore.similarEntities = [];
};

export default similarStore;
