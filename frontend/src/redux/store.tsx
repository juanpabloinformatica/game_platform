import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authSlice"
import reactionGameSlice from './features/games/reactionGame/reactionGameSlice'
import gamesSlice from './features/games/gamesSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        reactionGame: reactionGameSlice,
        games: gamesSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
