import axios from 'axios';
import { API } from '../helpers/constants';
import { logError } from '../helpers/functions';
import mocks from '../helpers/mocks';

const createNote = async ({
  description = mocks.noteDescription,
  topic = mocks.noteTopic,
  teacherId,
  schoolId,
  type = mocks.pdfFileType,
  subjects = [],
}) => {
  try {
    const { data } = await axios.post(API.QA_BACKDOOR_URL, {
      action: API.CREATE_NOTE,
      topic,
      description,
      type,
      teacherId,
      subjects,
      schoolId,
    });
    return data;
  } catch (e) {
    logError(e);
    throw new Error(e);
  }
};

export {
  createNote, // eslint-disable-line
};
