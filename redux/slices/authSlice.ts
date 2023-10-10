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
    },
    logoutUser: (state) => {
      state.userDetail = null;
      state.token = "";
    },
  },
});

export const { setAuthState, logoutUser } = authSlice.actions;
export default authSlice.reducer;
