import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ControlState {
  base64: string | null
}

// Define the initial state using that type
const initialState: ControlState = {
  base64: null
}

const controlSlice = createSlice({
  name: 'control',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState : initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<string>) => {
      state.base64=action.payload
    },
    setClose: (state) => {
      state.base64=null
    },
  },
})

export const { setOpen, setClose} = controlSlice.actions

export default controlSlice.reducer