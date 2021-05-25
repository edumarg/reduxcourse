// for getDefaultMiddleware install redux-thunk
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toasty from "./middleware/toasty";
import api from "./middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: "Console", user: "admin" }),
      toasty,
      api,
    ],
  });
}
