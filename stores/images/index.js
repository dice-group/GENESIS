import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {imagesAPI} from '../config';
import {getDisambiguation} from '../disambiguation';

// create store
const imagesStore = store({
  images: [],
  currentUrl: false,
  status: 'init',
});

export const getImages = async ({url, title}) => {
  if (imagesStore.currentUrl === url) {
    return;
  }
  imagesStore.currentUrl = url;
  imagesStore.status = 'loading';

  const disambiguation = await getDisambiguation(url);
  const q = `${title} ${disambiguation[0]}`;

  const images = await fetchival(imagesAPI)
    .post({q})
    .then(({images: res}) => res)
    .catch(e => ({error: e}));
  imagesStore.images = images;
  imagesStore.status = 'done';
};

export const clearImages = () => {
  imagesStore.images = [];
};

export default imagesStore;
