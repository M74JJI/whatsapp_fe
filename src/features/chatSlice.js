import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  notifications: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
});
export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
