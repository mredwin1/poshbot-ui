import { toast as toastNotification } from 'react-toastify';

const toast = (store) => (next) => (action) => {
  if (action.type === 'api/callFailed') {
    toastNotification.error(action.payload.message, {
      position: toastNotification.POSITION.TOP_CENTER,
    });
  } else if (
    action.type === 'api/callBegan' &&
    action.payload.onSuccess === 'poshUsers/added'
  ) {
    toastNotification.success('Successfully added a Posh User', {
      position: toastNotification.POSITION.TOP_CENTER,
    });
  }

  next(action);
};

export default toast;
