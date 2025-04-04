// src/redux/gamesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {Selectable} from '../../types.ts'

// Initial state for the selected game
const initialState: {selected: string | null, menu: number, entered: boolean} = {
  selected: null,
  menu: 0,
  entered: false,
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
      console.log(`Selected: ${action.payload}`);
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
