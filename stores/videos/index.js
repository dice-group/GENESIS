import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {videosAPI} from '../config';
import {getDisambiguation} from '../disambiguation';

// create store
const videosStore = store({
  videos: [],
  currentUrl: false,
  status: 'init',
});

export const getVideos = async ({url, title}) => {
  if (videosStore.currentUrl === url) {
    return;
  }
  videosStore.currentUrl = url;
  videosStore.status = 'loading';

  const disambiguation = await getDisambiguation(url);
  const q = `${title} ${disambiguation[0]}`;

  const videos = await fetchival(videosAPI)
    .post({q})
    .then(({videos: res}) => res)
    .catch(e => ({error: e}));
  videosStore.videos = videos;
  videosStore.status = 'done';
};

export const clearVideos = () => {
  videosStore.videos = [];
};

export default videosStore;
