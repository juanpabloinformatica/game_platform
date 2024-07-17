import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    isAuthenticated(state, action) {
      console.log("before action.payload");
      console.log(current(state));
      if (action.payload == true) {
        state.isAuth = true;
        console.log("after action.payload");
        console.log(current(state));
      }
    },
  },
});
export const { isAuthenticated } = authSlice.actions;
export default authSlice.reducer;
