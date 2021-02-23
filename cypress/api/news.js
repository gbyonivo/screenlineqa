import axios from 'axios';
import { API } from '../helpers/constants';
import mocks from '../helpers/mocks';

const createNews = async ({
  description = mocks.newsDescription,
  topic = mocks.newsTopic,
  teacherId,
  schoolId,
  type = 'NEWS',
  subjects = [],
}) => {
  const { data } = await axios.post(API.QA_BACKDOOR_URL, {
    action: API.CREATE_NEWS,
    topic,
    description,
    type,
    teacherId,
    subjects,
    schoolId,
  });
  return data;
};

export {
  createNews, // eslint-disable-line
};
