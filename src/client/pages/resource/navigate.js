import {browserHistory} from 'react-router';
import clearAll from '../../stores/util/clearAll';

export const navigateTo = (e, url, title) => {
    e.preventDefault();
    clearAll();
    browserHistory.push({
        pathname: '/resource',
        search: `?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    });
};
