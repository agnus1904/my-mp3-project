import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface accountState {
  name: string | null,
  email: string | null,
  photo: string | null,
}

// Define the initial state using that type
const initialState: accountState = {
  name: 'User',
  email: null,
  photo: null,
}

const accountSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState : initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addRememberAccount: (state, action: PayloadAction<accountState>) => {
      state.name= action.payload.name;
      state.email= action.payload.email;
      state.photo= action.payload.photo;
    },
  },
})

export const { addRememberAccount } = accountSlice.actions

export default accountSlice.reducer