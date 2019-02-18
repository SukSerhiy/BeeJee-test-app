const setSortField = payload => dispatch => {
  dispatch({
    type: 'SET_SORT_FIELD',
    payload
  });
}

export default setSortField;