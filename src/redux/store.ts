import { configureStore } from '@reduxjs/toolkit';
import home from './slices/home.ts';
import selection from './slices/selection.ts';


const saveState = (state: any) => {
  try {
    sessionStorage.setItem('reduxState', JSON.stringify(state));
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

// Function to load state from sessionStorage
const loadState = () => {
  try {
    return undefined;
    const serializedState = sessionStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    selection,
    home
  },
  preloadedState
})


export default store;
store.subscribe(() => {
  saveState(store.getState());
});

// Export types for the store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;