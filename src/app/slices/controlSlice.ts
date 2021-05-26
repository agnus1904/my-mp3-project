import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ControlState {
    id: string | null,
    data: {
        music_name: string | null,
        music_singer: string | null,
        music_url: string | null,
        music_avatar_url: string | null,
        music_banner_url: string | null
    }
}

// Define the initial state using that type
const initialState: ControlState = {
    id: null,
    data: {
        music_name: null,
        music_singer: null,
        music_url: null,
        music_avatar_url: null,
        music_banner_url: null,
    }
}

const controlSlice = createSlice({
  name: 'control',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState : initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<any>) => {
      state.id = action.payload.id;
      state.data.music_name = action.payload.data.music_name;
      state.data.music_singer = action.payload.data.music_singer;
      state.data.music_url= action.payload.data.music_url;
      state.data.music_avatar_url = action.payload.data.music_avatar_url;
      state.data.music_banner_url= action.payload.data.music_banner_url;
    },
    setClose: (state) => {
      state.id = null;
      state.data.music_name = null;
      state.data.music_singer = null;
      state.data.music_url=null;
      state.data.music_avatar_url = null;
      state.data.music_banner_url= null;
    },
  },
})

export const { setOpen, setClose} = controlSlice.actions

export default controlSlice.reducer