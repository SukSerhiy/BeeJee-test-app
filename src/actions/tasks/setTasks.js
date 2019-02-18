const setTasks = payload => dispatch => {
  dispatch({
    type: 'SET_TASKS',
    payload
  });
}

export default setTasks;