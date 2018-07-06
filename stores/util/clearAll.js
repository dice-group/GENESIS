import {clearDescription} from '../description';
import {clearAnnotations} from '../fox';
import {clearImages} from '../images';
import {clearLocation} from '../location';
import {clearRelated} from '../related';
import {clearSimilar} from '../similar';
import {clearSummary} from '../summary';
import {clearVideos} from '../videos';

export default () => {
  clearDescription();
  clearAnnotations();
  clearSummary();
  clearLocation();
  clearImages();
  clearVideos();
  clearSimilar();
  clearRelated();
};
