/* eslint camelcase: 0 */
const cheerio = require('cheerio');
// http requests
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// setup fetchival
fetchival.fetch = fetch;

const youtubeBaseUrl = 'http://www.youtube.com/results';

module.exports = search_query =>
  fetchival(youtubeBaseUrl, {responseAs: 'text'})
    .get({search_query})
    .then(body => cheerio.load(body))
    .then($ =>
      Array.from($('.yt-lockup-dismissable')).map(it => ({
        title: $('.yt-lockup-title a', it).text(),
        image: `//i.ytimg.com/vi/${$('li[data-video-ids]', it).attr('data-video-ids')}/mqdefault.jpg`,
        url: $('.yt-lockup-title a', it).attr('href'),
        duration: $('.video-time', it).text(),
        description: $('.yt-lockup-description', it).text(),
      }))
    );
