import { createAction } from "@reduxjs/toolkit";

export const apiRequested = createAction("api/Requested");
export const apiRequestSucceed = createAction("api/RequestSucceed");
export const apiRequestFailed = createAction("api/RequestFailed");
