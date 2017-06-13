// store creator
import {createStore} from 'rxstate';
// custom actions
import get$, {getImages} from './get';

// create store
const images$ = createStore({
    streams: [get$],
    defaultState: {
        images: [],
        status: 'init',
    },
});

const clearImages = images$.clear;

export {getImages, clearImages};
export default images$;
