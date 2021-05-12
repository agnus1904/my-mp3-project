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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch