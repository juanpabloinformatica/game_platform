import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  ballSpeed: 0,
  ballNumber: 0,
};
const reactionGame = createSlice({
  name: "reactionGame",
  initialState: initialState,
  reducers: {
    updateBallSpeed(state, action) {
      console.log(current(state));
      state.ballSpeed = action.payload;
      console.log(current(state));
    },
    updateBallNumber(state, action) {
      console.log(current(state));
      state.ballNumber = action.payload;
      console.log(current(state));
    },
  },
});
export const { updateBallSpeed, updateBallNumber } = reactionGame.actions;
export default reactionGame.reducer;
