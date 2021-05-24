import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

// Slice
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // actions => actions handlers
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].resolved = true;
    },
    bugRemoved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state.splice(index, 1);
    },

    bugAssignedToUser: (state, action) => {
      const { bugId, userId } = action.payload;
      const index = state.findIndex((bug) => bug.id === bugId);
      state[index].userId = userId;
    },
  },
});

export default slice.reducer;
export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } =
  slice.actions;

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
