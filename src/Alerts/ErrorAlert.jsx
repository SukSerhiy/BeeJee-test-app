import Alert from 'react-s-alert';

export default (message) => (
  Alert.error(message, {
    position: 'bottom',
    effect: 'slide',
    timeout: 2000
  })
);