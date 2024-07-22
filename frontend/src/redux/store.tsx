import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authSlice"
import reactionGameSlice from './features/games/reactionGame/reactionGameSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        reactionGame: reactionGameSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
