import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ControlState {
  music_id: string | null,
  music_name: string | null,
  music_singer: string | null,
  music_url: string | null,
  music_avatar_url: string | null,
  music_banner_url: string | null
}

// Define the initial state using that type
const initialState: ControlState = {
  music_id: null,
  music_name: null,
  music_singer: null,
  music_url: null,
  music_avatar_url: null,
  music_banner_url: null,
}

const controlSlice = createSlice({
  name: 'control',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState : initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<any>) => {
      state.music_id = action.payload.music_id;
      state.music_name = action.payload.music_name;
      state.music_singer = action.payload.music_singer;
      state.music_url= action.payload.music_url;
      state.music_avatar_url = action.payload.music_avatar_url;
      state.music_banner_url= action.payload.music_banner_url;
    },
    setClose: (state) => {
      state.music_id = null;
      state.music_name = null;
      state.music_singer = null;
      state.music_url=null;
      state.music_avatar_url = null;
      state.music_banner_url= null;
    },
  },
})

export const { setOpen, setClose} = controlSlice.actions

export default controlSlice.reducer