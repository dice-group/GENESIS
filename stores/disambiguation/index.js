import fetchival from 'fetchival';
import {disambiguationAPI} from '../config';

// create store
const disambiguations = {};

const getDisambiguation = async url => {
  if (disambiguations[url]) {
    return disambiguations[url];
  }
  disambiguations[url] = fetchival(disambiguationAPI)
    .post({url})
    .then(({disambiguation: res}) => res);
  return disambiguations[url];
};

export {getDisambiguation};
