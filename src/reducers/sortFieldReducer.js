export default (state = null, action) => {
  switch (action.type) {
    case 'SET_SORT_FIELD':
      return action.payload;
    default:
      return state;
  }
}