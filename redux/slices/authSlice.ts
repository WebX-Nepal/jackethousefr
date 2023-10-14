import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userDetail: any;
  token: string;
}
const initialState: AuthState = {
  userDetail: null,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.userDetail = action.payload?.user.userDetails;
      state.token = action.payload?.user.token;
      localStorage.setItem("token", state.token);
    },
    logOutUser: (state) => {
      state.userDetail = null;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setAuthState, logOutUser } = authSlice.actions;
export default authSlice.reducer;
