import md5 from 'js-md5';
import { EDITING_TOKEN } from '../constants/general';

const editTask = async (developer, id, editFields) => {
  const signature = getSignature(editFields, EDITING_TOKEN);
  const formData = new FormData();
  Object.keys(editFields).forEach(prop => {
    formData.append(prop, editFields[prop]);
  });
  formData.append('token', EDITING_TOKEN);
  formData.append('signature', signature);

  const res = await fetch(
    `https://uxcandy.com/~shapoval/test-task-backend/edit/${id}/?developer=${developer}`,
    {
      method: 'POST',
      body: formData
    }
  );

  const result = await res.json();
  const { status, message } = result;
  if (status === 'error') {
    throw new Error(message);
  }
  return await message;
}

const getSignature = (editFields, token) => {
  const sortedParamKeys = Object.keys(editFields).sort();
  const encodedFields = sortedParamKeys.reduce((result, prop) => {
    const key = encodeURIComponent(prop);
    const value = encodeURIComponent(editFields[prop]);
    return { ...result, [key]: value }
  }, {});
  const signStr = Object.keys(encodedFields).reduce((result, prop) => 
    result + (encodedFields[prop] ? `${prop}=${encodedFields[prop]}&` : ''), '');
  return md5(`${signStr}token=${token}`);
}

export default editTask;