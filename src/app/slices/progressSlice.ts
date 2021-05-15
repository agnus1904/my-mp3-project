import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface progressState {
    waiting: boolean,
    success: boolean,
    path: string | null,
}

// Define the initial state using that type
const initialState: progressState = {
    waiting: false, 
    success: true,
    path: null,
}

const progressSlice = createSlice({
    name: 'progress',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState : initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setWaiting: (state, action: PayloadAction<string>) => {
            state.waiting = true;
            state.success = false;
            state.path = action.payload;
        },
        setSuccess: (state) => {
            state.waiting = true;
            state.success = true;
        },
        setSuccessfalse: (state) => {
            state.waiting = true;
            state.success = false;
        },
        setClose: (state) => {
            state.waiting = false;
            state.success = true;
            state.path = null;
        },
    },
})

export const { setWaiting, setClose, setSuccess, setSuccessfalse } = progressSlice.actions

export default progressSlice.reducer