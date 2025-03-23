// src/redux/gamesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {Selectable} from '../../types.ts'

// Initial state for the selected game
const initialState: {selected: Selectable | null, menu: number, entered: number} = {
  selected: null,
  menu: 0,
  entered: 0,
};

// Create a slice to handle game selection
const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      if(!action.payload){
        return;
      }
      state.selected = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setEntered: (state, action) => {
      state.entered = action.payload;
    },
  },
});

// Export the action to set the selected game
export const { setSelected, setMenu, setEntered } = selectionSlice.actions;

// Export the reducer to be added to the store
export default selectionSlice.reducer;
