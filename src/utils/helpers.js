import TimeAgo from 'javascript-time-ago';
import uk from 'javascript-time-ago/locale/uk.json';

TimeAgo.addDefaultLocale(uk);

const timeAgo = new TimeAgo('en-US');
export const getBeautifyTime = (from, to) =>
  timeAgo.format(from + (Date.now() - to));
