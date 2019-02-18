const createTask = async (developer, data) => {
  const { username, email, text } = data;
  const formData  = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('text', text);

  const res = await fetch(
    `https://uxcandy.com/~shapoval/test-task-backend/create?developer=${developer}`,
    {
      method: 'POST',
      body: formData
    });
    
  const result = await res.json();
  const { status, message } = result;
  if (status === 'error') {
    throw new Error(message);
  }
  return await message;
}

export default createTask;