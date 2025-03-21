// src/redux/gamesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {Selectable} from '../../types.ts'

// Initial state for the selected game
const initialState: {selected: Selectable | null} = {
  selected: null
};

// Create a slice to handle game selection
const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

// Export the action to set the selected game
export const { setSelected } = selectionSlice.actions;

// Export the reducer to be added to the store
export default selectionSlice.reducer;
