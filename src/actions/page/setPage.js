const setPage = payload => dispatch => {
  dispatch({
    type: 'SET_PAGE',
    payload
  });
}

export default setPage;