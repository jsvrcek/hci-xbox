import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice of state
const themeSlice = createSlice({
  name: "theme",
  initialState: "dark",
  reducers: {
    toggleTheme: (state) => (state === "dark" ? "light" : "dark"),
  },
});

//const ThemeToggle: React.FC = () => {
//   const dispatch = useDispatch();
//   const theme = useSelector((state: any) => state.theme);
//
//   return (
//     <button onClick={() => dispatch(toggleTheme())}>
//       Switch to {theme === "dark" ? "light" : "dark"} mode
//     </button>
//   );
// };

// Create a slice of state
const homeSlice = createSlice({
  name: "home",
  initialState: "dark",
  reducers: {
    toggleTheme: (state) => (state === "dark" ? "light" : "dark"),
  },
});

export const { toggleTheme } = themeSlice.actions;

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});

export default store;