export default (state = [], action) => {
  switch (action.type) {
    case 'SET_SORT_DIRECTION':
      return action.payload;
    default:
      return state;
  }
}