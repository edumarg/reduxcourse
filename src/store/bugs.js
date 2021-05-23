import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

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
  },
});

export default slice.reducer;
export const { bugAdded, bugResolved, bugRemoved } = slice.actions;
