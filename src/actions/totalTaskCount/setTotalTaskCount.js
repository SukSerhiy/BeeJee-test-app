const setTotalTasksCount = payload => dispatch => {
  dispatch({
    type: 'SET_TOTAL_TASK_COUNT',
    payload
  });
}

export default setTotalTasksCount;