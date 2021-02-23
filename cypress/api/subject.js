import axios from 'axios';
import { API } from '../helpers/constants';
import { logError } from '../helpers/functions';
import mocks from '../helpers/mocks';

const createSubject = async ({
  name = mocks.subjectName,
  description = mocks.subjectDescription,
  creditUnit = mocks.creditUnit1,
  code = mocks.subjectCode,
  teacherId,
  teachers = [],
  year = mocks.year,
  semester = mocks.semester1,
  schoolId,
} = {}) => {
  try {
    const { data } = await axios.post(API.QA_BACKDOOR_URL, {
      action: API.CREATE_SUBJECT,
      name,
      description,
      creditUnit,
      year,
      code,
      teacherId,
      teachers,
      semester,
      schoolId,
    });
    return data;
  } catch (e) {
    logError(e);
    throw new Error(e);
  }
};

export {
  createSubject, // eslint-disable-line
};
