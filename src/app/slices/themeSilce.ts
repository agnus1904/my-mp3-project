import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface darkModeState {
  value: boolean,
}

// Define the initial state using that type
const initialState: darkModeState = {
  value: true,
}

const darkModeSlice = createSlice({
    name: 'theme',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState : initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        changeTheme: (state, action: PayloadAction<boolean>) => {
            state.value=action.payload;
        },
    },
})

export const { changeTheme } = darkModeSlice.actions

export default darkModeSlice.reducer