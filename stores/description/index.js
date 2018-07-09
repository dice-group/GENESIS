import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {descriptionAPI} from '../config';
import {getAnnotations} from '../fox';

// create store
const descriptionStore = store({
  description: {},
  currentResource: false,
  status: 'init',
});

export const getDescription = async url => {
  if (descriptionStore.currentResource === url) {
    return;
  }
  descriptionStore.currentResource = url;
  descriptionStore.status = 'loading';
  const description = await fetchival(descriptionAPI)
    .post({url})
    .then(({description: res}) => res)
    .catch(e => ({error: e}));
  descriptionStore.description = description;
  // annotate
  if (description && description.description) {
    getAnnotations(description.description);
  }
  // say we're done
  descriptionStore.status = 'done';
};

export const clearDescription = () => {
  descriptionStore.description = {};
};

export default descriptionStore;
