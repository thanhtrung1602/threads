import instance from "~/services/customize-axios";
import { loginStart, loginSuccess, loginFalse } from "./authSlice";
export const loginUser = async (user, dispatch, navigate, toast) => {
  dispatch(loginStart());
  try {
    const res = await instance.post("/auth/login", user);
    console.log(res.data.user);
    dispatch(loginSuccess(res.data.user));
    navigate("/");
    toast.success("Login successful!");
  } catch (error) {
    dispatch(loginFalse());
  }
};
