import {clearSummary} from '../summary';
import {clearDescription} from '../description';
import {clearLocation} from '../location';
import {clearImages} from '../images';
import {clearVideos} from '../videos';
import {clearFox} from '../fox';

export default () => {
    clearSummary();
    clearDescription();
    clearLocation();
    clearImages();
    clearVideos();
    clearFox();
};
