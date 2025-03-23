// src/redux/gamesSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {getUniqueRandomIntegers} from '../../utils/random.ts'
import type {Game} from "../../types.ts";

import games_list from "../../xbox_games.json"
import inc from "../../utils/increment.ts";

const random = getUniqueRandomIntegers(0, games_list.length, 20)
const defaultCounts = () => ({startIndex: 20, idx: 0, rowCount: 0, rowLimit: 6});
const counts = defaultCounts();
let defaultGames: Game[] = random.map((r) => {
    return {
        ...games_list[r],
        index: inc(counts),
        id: `game-${games_list[r].title}`,
        name: games_list[r].title
    }
}) as Game[];

const initialState: { games: Game[], text: string } = {
    games: defaultGames,
    text: "",
};


// Create a slice to handle game selection
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResults: (state, action) => {
            const counts = defaultCounts();
            state.games =  action?.payload?.slice(0, 20).map((g) => ({
                ...g,
                index: inc(counts),
                name: g?.title,
                id: `game-${g?.title}`
            })) || [];
        },
        setSearchText: (state, action) => {
            state.text = action?.payload || ""
        },
    },
});

// Export the action to set the selected game
export const {setSearchResults, setSearchText} = searchSlice.actions;

// Export the reducer to be added to the store
export default searchSlice.reducer;
