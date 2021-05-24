import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export default slice.reducer;
export const { userAdded } = slice.actions;
