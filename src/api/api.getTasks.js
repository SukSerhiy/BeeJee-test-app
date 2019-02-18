const getTasks = async (developer, params) => {
  params = params || {};
  const urlParams = Object.keys(params).reduce((result, prop) => 
    result + (params[prop] ? `&${prop}=${params[prop]}` : ''), '');
    console.log(`https://uxcandy.com/~shapoval/test-task-backend/?developer=${developer}${urlParams}`);
  const res =  await fetch(
    `https://uxcandy.com/~shapoval/test-task-backend/?developer=${developer}${urlParams}`);
  const result = await res.json();
  const { status, message } = result;
  if (status === 'error') {
    throw new Error(message);
  }
  return await message;
}

export default getTasks;