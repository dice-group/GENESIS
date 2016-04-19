// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getVideos} from './get';

// create store
const videos$ = createStore({
    streams: [get$],
    defaultState: {
        videos: [],
        status: 'init',
    },
});

const clearVideos = videos$.clear;

export {getVideos, clearVideos};
export default videos$;
