import axios from "axios";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== "apiRequest") return next(action);
    next(action);
    // Call API
    // Handle request success
    // Handle request error
    const { url, method, data, onSuccess, onError } = action.payload;
    try {
      const response = await axios.request({
        baseURL: " http://localhost:9001/api",
        url,
        method,
        data,
      });
      dispatch({ type: onSuccess, payload: response.data });
    } catch (e) {
      console.log("error: ", e);
      dispatch({ type: onError, payload: e });
    }
  };

export default api;
