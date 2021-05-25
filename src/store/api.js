import { createAction } from "@reduxjs/toolkit";

export const apiRequested = createAction("apiRequested");
export const apiRequestSucceed = createAction("apiRequestSucceed");
export const apiRequestFailed = createAction("apiRequestFailed");
