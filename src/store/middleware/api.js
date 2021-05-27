import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiRequested.type) return next(action);

    // Call API
    // Handle request success
    // Handle request error
    const { url, method, data, onStart, onSuccess, onError } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });

      // general
      dispatch(actions.apiRequestSucceed(response.data));
      // specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (e) {
      console.log("error: ", e.message);

      // general
      dispatch(actions.apiRequestFailed(e.message));
      // specific
      if (onError) dispatch({ type: onError, payload: e.message });
    }
  };

export default api;
