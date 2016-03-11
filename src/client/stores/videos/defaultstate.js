import {fromJS} from 'immutable';

const videosState = fromJS({
    videos: [],
    status: 'init',
});

export default videosState;
