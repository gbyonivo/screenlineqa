import axios from 'axios';
import { API } from '../helpers/constants';
import { logError } from '../helpers/functions';
import mocks from '../helpers/mocks';

const createClass = async ({
  name = mocks.className,
  description = mocks.classDescription,
  address = mocks.address,
  colour = mocks.classColour,
  code = mocks.classCode,
  teacherId,
  level = mocks.classLevel,
  schoolId,
  subjectsIds = [],
} = {}) => {
  try {
    const { data } = await axios.post(API.QA_BACKDOOR_URL, {
      action: API.CREATE_CLASS,
      name,
      description,
      address,
      colour,
      code,
      teacherId,
      level,
      schoolId,
      subjectsIds,
    });
    return data;
  } catch (e) {
    logError(e);
    throw new Error(e);
  }
};

export {
  createClass, // eslint-disable-line
};
