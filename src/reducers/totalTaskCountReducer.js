export default (state = 0, action) => {
  switch (action.type) {
    case 'GET_TOTAL_TASKS_COUNT':
      return action.payload;
    default:
      return state;
  }
}