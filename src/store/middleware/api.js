import axios from 'axios';
import * as actions from '../api';

const api =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    next(action);
    const { url, method, data, onSuccess, onError } = action.payload;
    const { user } = getState();
    if (user.accessToken) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `JWT ${user.accessToken}`;
    }
    const headers = {
      'Content-Type':
        onSuccess === 'listings/added'
          ? 'multipart/form-data'
          : 'application/json',
    };
    try {
      const response = await axios.request({
        baseURL: 'https://api.poshbot.net',
        url,
        method,
        data,
        headers,
      });
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch(actions.apiCallFailed(error));
      if (onError) dispatch({ type: onError, payload: error });
    }
  };

export default api;
