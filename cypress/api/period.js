import axios from 'axios';
import { API, PERIOD_TYPES } from '../helpers/constants';
import { logError } from '../helpers/functions';
import mocks from '../helpers/mocks';
import {
  elevenAmHHmm, elevenAmHHmmss, nineAmHHmm, nineAmHHmmss, todayYYYYMMDD,
} from '../helpers/timeConstants';

const createPeriod = async ({
  description = mocks.periodDescription,
  name = mocks.periodName,
  schoolId,
  subjectId,
  parentPeriodId = null,
  type = PERIOD_TYPES.TIMETABLE,
  date = todayYYYYMMDD,
  startTime = nineAmHHmmss,
  endTime = elevenAmHHmmss,
  screenDate = todayYYYYMMDD,
  screenStartTime = nineAmHHmm,
  screenEndTime = elevenAmHHmm,
}) => {
  try {
    const { data } = await axios.post(API.QA_BACKDOOR_URL, {
      action: API.CREATE_PERIOD,
      description,
      name,
      subjectId,
      type,
      parentPeriodId,
      schoolId,
      date,
      startTime,
      endTime,
    });
    return {
      ...data, screenDate, screenStartTime, screenEndTime,
    };
  } catch (e) {
    logError(e);
    throw new Error(e);
  }
};

export {
  createPeriod, // eslint-disable-line
};
