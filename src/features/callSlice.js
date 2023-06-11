import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    call: (state, action) => {
      state = action.payload;
    },
  },
});

export const { peer } = callSlice.actions;

export default callSlice.reducer;
