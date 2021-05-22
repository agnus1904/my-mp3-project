import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const { createAsyncThunk } = require("@reduxjs/toolkit");

interface  paramsProps {
    path: string,
    actions: {
        action:any,
        params: any
    }[];
}

export const progressWaiting = createAsyncThunk('progress/wating', async (params: paramsProps, thunkAPI: any) => {

    // start waiting 
    thunkAPI.dispatch(setWaiting(params.path));

    // settimeout 1sec
    let timer:  NodeJS.Timeout | null =  setTimeout(()=>{
        timer=null;
    },1000);

    // dispatch each action  
    await params.actions.reduce(async(a: any, b: any)=>{
        await a;
        await thunkAPI.dispatch(b.action(b.params));
    },  undefined);

    // if timeut still counting 
    timer && await new Promise(resolve => setTimeout(resolve, 500));
    
    // end waiting 
    thunkAPI.dispatch(setSuccess())
    return;

});

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
    extraReducers: {
        [progressWaiting.fulfilled]: () => {
        },
      }
})

export const { setWaiting, setClose, setSuccess, setSuccessfalse } = progressSlice.actions

export default progressSlice.reducer