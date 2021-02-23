import axios from 'axios';
import { API } from '../helpers/constants';
import mocks from '../helpers/mocks';

const createGrade = async ({
  code = mocks.gradeCode,
  name = mocks.gradeName,
  schoolId,
  bottomMargin = mocks.bottomMargin,
  topMargin = mocks.topMargin,
  points = mocks.points,
}) => {
  const { data } = await axios.post(API.QA_BACKDOOR_URL, {
    action: API.CREATE_TAG,
    code,
    name,
    bottomMargin,
    topMargin,
    points,
    schoolId,
  });
  return data;
};

export {
  createGrade, // eslint-disable-line
};
