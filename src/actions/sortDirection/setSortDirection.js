const setSortDirection = payload => dispatch => {
  dispatch({
    type: 'SET_SORT_DIRECTION',
    payload
  });
}

export default setSortDirection;