export default (state = false, action) => {
  switch (action.type) {
    case 'SET_AUTHORIZED':
      return true;
    case 'SET_UNAUTHORIZED':
      return false;
    default:
      return state;
  }
}