import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {foxAPI} from '../config';

// create store
const foxStore = store({
  annotations: [],
  status: 'init',
});

export const getAnnotations = async input => {
  foxStore.status = 'loading';
  const annotations = await fetchival(foxAPI)
    .post({input})
    .then(({annotations: res}) => res)
    .catch(e => ({error: e}));
  foxStore.annotations = annotations;
  foxStore.status = 'done';
};

export const clearAnnotations = () => {
  foxStore.annotations = [];
};

export default foxStore;
