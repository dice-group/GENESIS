import getConfig from 'next/config';

const {
  publicRuntimeConfig: {baseDomain},
} = getConfig();

export const searchAPI = `${baseDomain}/api/search`;
export const descriptionAPI = `${baseDomain}/api/description`;
export const disambiguationAPI = `${baseDomain}/api/disambiguation`;
export const imagesAPI = `${baseDomain}/api/images`;
export const videosAPI = `${baseDomain}/api/videos`;
export const similarAPI = `${baseDomain}/api/similar`;
export const relatedAPI = `${baseDomain}/api/related`;
export const typeaheadAPI = `${baseDomain}/api/typeahead`;
export const summaryAPI = `${baseDomain}/api/summary`;
export const locationAPI = `${baseDomain}/api/location`;
export const foxAPI = `${baseDomain}/api/fox`;
