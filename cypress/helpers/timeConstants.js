import {
  format, addMonths, subYears, addDays,
} from 'date-fns';

const fiveMonthsFromToday = format(addMonths(new Date(), 5), 'yyyy-MM-dd HH:mm:ss');
const oneMonthsFromToday = format(addMonths(new Date(), 1), 'yyyy-MM-dd HH:mm:ss');
const today = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
const todayyyyYMMdd = format(new Date(), 'yyyy-MM-dd');
const currentYear = parseInt(format(new Date(), 'yyyy'), 10);
const twentyYearAgo = format(subYears(new Date(), 20), 'yyyy-MM-dd');
const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd HH:mm:ss');
const yearWithSlash = `${currentYear}/${currentYear + 1}`;
const nineAmHHmm = '09:00';
const nineAmHHmmss = '09:00:00';
const elevenAmHHmm = '11:00';
const elevenAmHHmmss = '11:00:00';

export {
  fiveMonthsFromToday,
  oneMonthsFromToday,
  today,
  currentYear,
  twentyYearAgo,
  tomorrow,
  yearWithSlash,
  todayyyyYMMdd,
  nineAmHHmm,
  nineAmHHmmss,
  elevenAmHHmm,
  elevenAmHHmmss,
};
