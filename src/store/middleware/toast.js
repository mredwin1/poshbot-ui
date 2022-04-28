import { toast as toastNotification } from 'react-toastify';
import { apiCallBegan, apiCallFailed } from '../api';
import { added as listingAdded } from '../listings';
import { added as poshUserAdded } from '../poshUsers';
import {
  added as campaignAdded,
  started as campaignStarted,
} from '../campaigns';

const toast = (store) => (next) => (action) => {
  if (action.type === apiCallFailed.type) {
    toastNotification.error(action.payload.message, {
      position: toastNotification.POSITION.TOP_CENTER,
    });
  } else if (
    action.type === apiCallBegan.type &&
    action.payload.onSuccess === poshUserAdded.type
  ) {
    toastNotification.success('Posh User is being added', {
      position: toastNotification.POSITION.TOP_CENTER,
    });
  } else if (
    action.type === apiCallBegan.type &&
    action.payload.onSuccess === listingAdded.type
  ) {
    toastNotification.success('Listing is being added', {
      position: toastNotification.POSITION.TOP_CENTER,
    });
  } else if (
    action.type === apiCallBegan.type &&
    action.payload.onSuccess === campaignAdded.type
  ) {
    toastNotification.success('Campaign is being added', {
      position: toastNotification.POSITION.TOP_CENTER,
    });
  } else if (
    action.type === apiCallBegan.type &&
    action.payload.onSuccess === campaignStarted.type
  ) {
    toastNotification.success('Campaign is started', {
      position: toastNotification.POSITION.TOP_CENTER,
    });
  }

  next(action);
};

export default toast;
