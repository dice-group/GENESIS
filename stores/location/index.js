import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {locationAPI} from '../config';

// create store
const locationStore = store({
  location: {},
  currentUrl: false,
  status: 'init',
});

export const getLocation = async url => {
  if (locationStore.currentUrl === url) {
    return;
  }
  locationStore.currentUrl = url;
  locationStore.status = 'loading';
  const location = await fetchival(locationAPI)
    .post({url})
    .then(({location: res}) => res)
    .catch(e => ({error: e}));
  locationStore.location = location;
  locationStore.status = 'done';
};

export const clearLocation = () => {
  locationStore.location = {};
};

export default locationStore;
