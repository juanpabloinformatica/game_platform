import { createSlice, current } from "@reduxjs/toolkit";

const initialState: { isAuth: boolean; user: number } = {
  isAuth: false,
  user: -1,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    isAuthenticated(state, action) {
      console.log("before action.payload");
      console.log(current(state));
      state.isAuth = action.payload;
      console.log("after action.payload");
      console.log(current(state));
    },
    setUser(state, action) {
      console.log("before action.payload");
      console.log(current(state));
      state.user = action.payload;
      console.log("after action.payload");
      console.log(current(state));
    },
  },
});
export const { isAuthenticated, setUser } = authSlice.actions;
export default authSlice.reducer;
