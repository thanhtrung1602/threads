import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "~/types/user";
export interface AuthState {
  login: {
    currentUser: IUser | null;
    isFetching: boolean;
    error: boolean;
  };
}
const initialState: AuthState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFalse: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFalse } = authSlice.actions;

export default authSlice.reducer;
