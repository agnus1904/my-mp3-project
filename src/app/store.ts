import { configureStore } from '@reduxjs/toolkit'
import controlSlice from './slices/controlSlice'
import counterSlice from './slices/counterSlice'
import progressSlice from './slices/progressSlice'
import darkModeSilce from './slices/themeSilce'

export const store = configureStore({
    reducer: {
        counter : counterSlice,
        darkMode: darkModeSilce,
        progress : progressSlice,
        control: controlSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch