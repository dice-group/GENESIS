import fetchival from 'fetchival';
import {store} from 'react-easy-state';
import {typeaheadAPI} from '../config';

// create store
const typeaheadStore = store({
  results: [],
  status: 'init',
});

export const getSuggestions = async q => {
  typeaheadStore.status = 'loading';
  const results = await fetchival(typeaheadAPI)
    .post({q})
    .catch(e => ({error: e}));
  typeaheadStore.results = results;
  typeaheadStore.status = 'done';
};

export const clearSuggestions = () => {
  typeaheadStore.results = [];
};

export default typeaheadStore;
