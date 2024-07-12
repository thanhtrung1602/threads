import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    update: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    updateStart: (state) => {
      state.update.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.update.isFetching = false;
      state.update.currentUser = action.payload;
      state.update.error = false;
    },
    updateError: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    },
  },
});

export const { updateStart, updateSuccess, updateError } = userSlice.actions;
export default userSlice.reducer;
