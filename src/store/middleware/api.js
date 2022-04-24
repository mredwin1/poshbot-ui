import axios from 'axios';

const api = (store) => (next) => async (action) => {
  if (action.type !== 'apiCallBegan') return next(action);

  next(action);

  const { url, method, data, onSuccess, onError } = action.payload;

  try {
    console.log(method);
    const response = await axios.request({
      baseURL: ' http://127.0.0.1:8000',
      url,
      method,
      data,
    });
    store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    store.dispatch({ type: onError, payload: error.payload });
  }
};

export default api;
