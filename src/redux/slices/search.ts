// src/redux/gamesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {getUniqueRandomIntegers} from '../../utils/random.ts'
import type {Feature, Game} from "../../types.ts";



import games_list from "../../xbox_games.json"
const random = getUniqueRandomIntegers(0, games_list.length, 20)
let defaultGames: Game[] = random.map((r,i) => ({...games_list[r], index: i, id: `game-${games_list[r].title}`, name: games_list[r].title})) as Game[];

const initialState: {games: Game[]} = {
  games: defaultGames
};


// Create a slice to handle game selection
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      const startIndex = 21
      state.games = action?.payload?.slice(0, 10).map((g,i)=> ({...g, index: startIndex+i, name: g.title, id: `game-${g.title}`})) || [];
    },
   },
});

// Export the action to set the selected game
export const { setSearchResults } = searchSlice.actions;

// Export the reducer to be added to the store
export default searchSlice.reducer;
