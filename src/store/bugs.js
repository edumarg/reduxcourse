import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiRequested } from "./api";

let lastId = 0;

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
      state.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
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
      const index = state.list.findIndex((bug) => bug.id === bugId);
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
  console.log(
    "time passed since last fetch: ",
    (Date.now() - lastFetch) / 1000,
    "s"
  );
  // request api only if time since last fetch is more than 10 minutes or 600 seconds
  if ((Date.now() - lastFetch) / 1000 < 600) return;
  dispatch(
    apiRequested({
      url: URL,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
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
