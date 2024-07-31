import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    modality: true 
};
const games = createSlice({
    name: "games",
    initialState: initialState,
    reducers: {
        setModality(state, action) {
            console.log("here")
            console.log(current(state)); 
            state.modality = action.payload
            console.log(current(state));

        }
    },
});
export const {setModality} = games.actions;
export default games.reducer;
