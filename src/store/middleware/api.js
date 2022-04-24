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
    try {
      const response = await axios.request({
        baseURL: 'https://api.poshbot.net',
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      console.log(error.response);
      console.log(error.request);
      console.log(error.message);

      dispatch(actions.apiCallFailed(error.response));
      if (onError) dispatch({ type: onError, payload: error.response });
    }
  };

export default api;
