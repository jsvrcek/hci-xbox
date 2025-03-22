import React, {useState} from "react";
import SearchRow from "./SearchRow.tsx";
import type {Feature} from "../types.ts";
import {ArrowLeftCircleFill, Mic, MicFill} from "react-bootstrap-icons";
import {setSelected} from "../redux/slices/selection.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {setSearchResults} from "../redux/slices/search.ts";
import {lookupGames} from "../utils/lookupGames.ts";
import {useNavigate} from "react-router";
import {MicButton} from "./MicButton.tsx";
import {LoadingSpinner} from "./LoadingSpinner.tsx";



const SearchPage = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {selected} = useSelector((state: RootState) => state.selection);
    const navigate = useNavigate();


    const menuItems: Feature[] = [
        {
            id: "search-menu-top",
            name: "Top Results",
            index: 11,
            onClick: () => dispatch(setSelected("search-menu-top"))
        },
        {
            id: "search-menu-games",
            name: "Games",
            index: 12,
            onClick: () => dispatch(setSelected("search-menu-games"))
        },
        {
            id: "search-menu-people",
            name: "People",
            index: 13,
            onClick: () => dispatch(setSelected("search-menu-people"))
        },
        {
            id: "search-menu-install",
            name: "Installed",
            index: 14,
            onClick: () => dispatch(setSelected("search-menu-install"))
        },
        {
            id: "search-menu-movies",
            name: "Movies & TV",
            index: 14,
            onClick: () => dispatch(setSelected("search-menu-movies"))
        },
        {
            id: "search-menu-apps",
            name: "Apps",
            index: 15,
            onClick: () => dispatch(setSelected("search-menu-apps"))
        },
        {
            id: "search-menu-settings",
            name: "Settings",
            index: 15,
            onClick: () => dispatch(setSelected("search-menu-settings"))
        }
    ].map(m => ({...m, key: m.id}))


    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/search", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({search: text}),
            });
            const gameResults = await response.json();
            if(gameResults?.games) {
                const foundGames = lookupGames(gameResults.games);
                if (foundGames?.length) {
                    dispatch(setSearchResults(foundGames));
                }
            }
        }finally {
            setIsLoading(false);
        }
    };

    const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            await handleSearch();  // Trigger search on Enter
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-teal-900 text-white p-6 ">
            <div className="flex flex-row align-center items-center justify-center space-x-4">
                <ArrowLeftCircleFill className="h-8 w-8 text-gray-300" onClick={() => navigate('/')}/>
                <input
                    className="bg-gray-700 rounded-3xl text-left py-2 px-6 text-xl w-150 focus:outline-none focus:border-4 focus:border-blue-500"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search"
                    onKeyUp={handleKeyUp}
                />
                <MicButton isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>
            <nav className="flex justify-center space-x-6 mt-6">
                {menuItems.map((menuItem) => (
                    <button tabIndex={menuItem.index}
                            key={menuItem.id}
                            onClick={menuItem['onClick']}
                            className={selected === menuItem.id ? "bg-blue-500 px-4 py-2 rounded-lg" : "bg-transparent hover:underline hover:decoration-blue-500 hover:underline-offset-8 hover:decoration-4 focus:bg-blue bg-transparent text-gray-300"}>{menuItem.name}</button>
                ))}
            </nav>

            {/*/!* Filters *!/*/}
            {/*<div className="flex flex-wrap justify-center gap-3 m-8">*/}
            {/*    {["Two Player", "Action", "Rated: E", "Rated: E10+", "Side Scroller", "Keyword: Metroidvania"].map((filter) => (*/}
            {/*        <button key={filter} className="bg-gray-800 px-4 py-2 rounded-lg">{filter}</button>*/}
            {/*    ))}*/}
            {/*</div>*/}

            <SearchRow/>
        </div>
    );
};

export default SearchPage;