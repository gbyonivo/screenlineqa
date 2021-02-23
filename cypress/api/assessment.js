import axios from 'axios';
import { API, ASSESSMENT_TYPES } from '../helpers/constants';
import { logError } from '../helpers/functions';
import mocks from '../helpers/mocks';
import { tomorrow, yearWithSlash } from '../helpers/timeConstants';

const createAssessment = async ({
  description = mocks.assessmentDescription,
  topic = mocks.assessmentTopic,
  teacherId,
  schoolId,
  semesterId,
  type = ASSESSMENT_TYPES.ASSIGNMENT,
  overallMark = mocks.assessmentOverall,
  deadline = tomorrow,
  subjects = [],
  semester = mocks.semester2,
  year = yearWithSlash,
}) => {
  try {
    const { data } = await axios.post(API.QA_BACKDOOR_URL, {
      action: 'createAssessment',
      topic,
      description,
      type,
      teacherId,
      subjects,
      schoolId,
      semesterId,
      deadline,
      overallMark,
      semester,
      year,
    });
    return data;
  } catch (e) {
    logError(e);
    throw new Error(e);
  }
};

export {
  createAssessment, // eslint-disable-line
};
