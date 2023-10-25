import { createSlice } from '@reduxjs/toolkit';

const modifierSlice = createSlice({
  name: 'modifier',
  initialState: {
    ctrl: false,
    shift: false,
  },
  reducers: {
    setCtrl: (state, action) => {
      state.ctrl = action.payload;
    },
    setShift: (state, action) => {
      state.shift = action.payload;
    },
  },
});

export const { setCtrl, setShift } = modifierSlice.actions;
export default modifierSlice.reducer;
