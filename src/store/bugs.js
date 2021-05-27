import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiRequested } from "./api";

// Slice
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // actions => actions handlers
    bugAdded: (state, action) => {
      state.list.push(action.payload);
    },
    bugResolved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[index].resolved = true;
    },
    bugRemoved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list.splice(index, 1);
    },

    bugAssignedToUser: (state, action) => {
      const { bugId, userId } = action.payload;
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[index].userId = userId;
    },

    bugsRequested: (state, action) => {
      state.loading = true;
    },

    bugsReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },

    bugsRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export default slice.reducer;
export const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssignedToUser,
  bugsRequested,
  bugsRequestFailed,
  bugsReceived,
} = slice.actions;

// Action Creators
const URL = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  if (lastFetch)
    console.log(
      "time passed since last fetch: ",
      (Date.now() - lastFetch) / 60000,
      "min"
    );
  // request api only if time since last fetch is more than 10 minutes
  if ((Date.now() - lastFetch) / 60000 < 10) return;
  dispatch(
    apiRequested({
      url: URL,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiRequested({
    url: URL,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (bug) => {
  return apiRequested({
    url: `${URL}/${bug.id}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });
};

export const assigneUserToBug = (bug) => {
  return apiRequested({
    url: `${URL}/${bug.id}`,
    method: "patch",
    data: { userId: bug.userId },
    onSuccess: bugAssignedToUser.type,
  });
};

// Selector using reselect lib ( Memoizing selector)
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsbyUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
