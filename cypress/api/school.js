import axios from 'axios';
import * as timeConstants from '../helpers/timeConstants';
import { SCHOOL_TYPES, API } from '../helpers/constants';
import mocks from '../helpers/mocks';
import { logError } from '../helpers/functions';

const createSchool = async ({
  name = mocks.schoolName,
  address = mocks.address,
  website = mocks.schoolWebsite,
  scoresSubmissionDeadline = timeConstants.fiveMonthsFromToday,
  semesterEndDate = timeConstants.fiveMonthsFromToday,
  semesterStartDate = timeConstants.today,
  type = SCHOOL_TYPES.TERTIARY,
  year = timeConstants.yearWithSlash,
  subjectRegistrationDeadline = timeConstants.oneMonthsFromToday,
  settings,
  overseer,
} = {}) => {
  try {
    const { data } = await axios.post(API.QA_BACKDOOR_URL, {
      name,
      address,
      type,
      website,
      semester: {
        startDate: semesterStartDate,
        endDate: semesterEndDate,
        subjectRegistrationDeadline,
        scoresSubmissionDeadline,
        year,
        name: mocks.semesterName,
      },
      settings,
      overseer,
      action: API.CREATE_SCHOOL,
    });
    return data;
  } catch (e) {
    logError(e);
    throw new Error(e);
  }
};

const createSemester = async ({
  name = mocks.semesterName,
  scoresSubmissionDeadline = timeConstants.fiveMonthsFromToday,
  endDate = timeConstants.fiveMonthsFromToday,
  startDate = timeConstants.today,
  year = timeConstants.yearWithSlash,
  subjectRegistrationDeadline = timeConstants.oneMonthsFromToday,
  schoolId,
} = {}) => {
  try {
    const { data } = await axios.post(API.QA_BACKDOOR_URL, {
      startDate,
      endDate,
      subjectRegistrationDeadline,
      scoresSubmissionDeadline,
      year,
      name,
      schoolId,
      action: API.CREATE_SEMESTER,
    });
    return data;
  } catch (e) {
    logError(e);
    throw new Error(e);
  }
};

const deleteSchool = async (schoolId) => {
  await axios.post(API.QA_BACKDOOR_URL, { action: 'deleteSchool', id: schoolId });
};

export {
  createSchool,
  createSemester,
  deleteSchool,
};
