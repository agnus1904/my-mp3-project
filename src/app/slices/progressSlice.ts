import { createSlice} from '@reduxjs/toolkit'

// Define a type for the slice state
interface progressState {
    waiting: boolean,
    success: boolean,
}

// Define the initial state using that type
const initialState: progressState = {
    waiting: false, 
    success: true,
}

const progressSlice = createSlice({
    name: 'progress',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState : initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setWaiting: (state) => {
            state.waiting = true;
            state.success = false;
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
        },
    },
})

export const { setWaiting, setClose, setSuccess, setSuccessfalse } = progressSlice.actions

export default progressSlice.reducer