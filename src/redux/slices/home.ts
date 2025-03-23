// src/redux/gamesSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {getUniqueRandomIntegers} from '../../utils/random.ts'
import type {Feature, Game} from "../../types.ts";


import games_list from "../../xbox_games.json"
import inc from "../../utils/increment.ts";

const random = getUniqueRandomIntegers(0, games_list.length, 9)
let defaultGames: Game[] = (() => {
    const counts = {startIndex: 10, idx: 0, rowCount: 0, rowLimit: 9};
    return random.map((r) => {
        return {...games_list[r], index: inc(counts), id: `game-${games_list[r].title}`, name: games_list[r].title}
    }) as Game[];
})();

let defaultFeatures: Feature[] = (() => {
    const counts = {startIndex: 20, idx: 0, rowCount: 0, rowLimit: 4};
    return [
        {name: "Browse the store", image_path: "/browseStore.png"},
        {name: "Play Avowed Now", image_path: "/avowedfeat.png"},
        {name: "Test Your Relationship", image_path: "/relationshipFeat.png"},
        {name: "Play Khazan", image_path: "/playKhazan.png"}
    ].map(f => {
        return {...f, key: `feature-${f.name}`, index: inc(counts), id: `feature-${f.name}`}
    });
})()

// Initial state for the selected game
const initialState: { games: Game[], featured: Feature[] } = {
    games: defaultGames,
    featured: defaultFeatures
};


// Create a slice to handle game selection
const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setGames: (state, action) => {
            const counts = {startIndex: 10, idx: 0, rowCount: 0, rowLimit: 9};
    const inc = inc(counts);
            const pinned = action.payload?.filter(g => g.pin);
            const unpinned = action.payload?.filter(g => !g.pin);
            state.games = [...pinned, ...unpinned].slice(0, 9).map((g) => ({
                ...g,
                index: inc(),
                name: g.title,
                id: `game-${g.title}`
            }));
        },
        setFeatures: (state, action) => {
            const counts = {startIndex: 20, idx: 0, rowCount: 0, rowLimit: 4};
            const inc = inc(counts);
            state.featured = action.payload?.slice(0, 4).map((g, i) => ({...g, index: inc()}));
        }
    },
});

// Export the action to set the selected game
export const {setFeatures, setGames} = homeSlice.actions;

// Export the reducer to be added to the store
export default homeSlice.reducer;
