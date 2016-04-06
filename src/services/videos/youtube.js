/* eslint camelcase: 0 */
import cheerio from 'cheerio';
// http requests
import fetchival from 'fetchival';
import fetch from 'node-fetch';
fetchival.fetch = fetch;

const youtubeBaseUrl = 'http://www.youtube.com/results';

export default (search_query) => fetchival(youtubeBaseUrl, {responseAs: 'text'})
    .get({search_query})
    .then(body => cheerio.load(body))
    .then($ => Array
        .from($('.yt-lockup-dismissable'))
        .map(it => ({
            title: $('.yt-lockup-title a', it).text(),
            image: `//i.ytimg.com/vi/${$('li[data-video-ids]', it).attr('data-video-ids')}/mqdefault.jpg`,
            url: $('.yt-lockup-title a', it).attr('href'),
            duration: $('.video-time', it).text(),
            description: $('.yt-lockup-description', it).text(),
        })));
