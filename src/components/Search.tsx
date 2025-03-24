import React, {useEffect, useState} from "react";
import SearchRow from "./SearchRow.tsx";
import type {Feature} from "../types.ts";
import {ArrowLeftCircleFill, Mic, MicFill} from "react-bootstrap-icons";
import {setEntered, setSelected} from "../redux/slices/selection.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {setSearchResults, setSearchText} from "../redux/slices/search.ts";
import {lookupGames} from "../utils/lookupGames.ts";
import {useNavigate} from "react-router";
import {MicButton} from "./MicButton.tsx";
import {useGlobalKeyPress} from "../hooks/keys.ts";


const SearchPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {games, text: searchText} = useSelector((state: RootState) => state.search);
    const [textContent, setTextContent] = useState("");

    const {selected, entered} = useSelector((state: RootState) => state.selection);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setEntered(false));
        dispatch(setSelected("search-search"));
    }, []);

    useEffect(() => {
        // Allow deleting
        if (!searchText && textContent.length === 1){
            setTextContent("")
        } else if (searchText) {
            setTextContent(searchText);
            void handleSearch();
        }
        dispatch(setEntered(false));
    }, [searchText]);

    useEffect(() => {
        if(selected === 'search-back' && entered){
            navigate('/');
            dispatch(setEntered(false));
        }
    }, [entered]);

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
        if (!searchText) {
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/search", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({search: searchText}),
            });
            const gameResults = await response.json();

            if (gameResults?.games) {
                const foundGames = lookupGames(gameResults.games);
                if (foundGames?.length) {
                    dispatch(setSearchResults(foundGames));
                }
            }
        } finally {
            setSearchText("");
            setIsLoading(false);
            dispatch(setEntered(false));
        }
    };

    const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            await handleSearch();  // Trigger search on Enter
        }
    };


    const navigables = [{index: 1, id: 'search-back'}, {index: 2, id: 'search-search'}, {
        index: 3,
        id: 'search-mic'
    }, ...menuItems, ...games]
    const setSelectedByIndex = (idx) => {
        if (!!idx) {
            console.log(`Selecting Index: ${idx}`)
            dispatch(setSelected(navigables.find(n => n.index === idx)?.id));
        }
    }

    const getSelectedIndex = () => navigables.find(n => n.id === selected)?.index
    useGlobalKeyPress(getSelectedIndex, setSelectedByIndex);


    useEffect(() => {
        if ([4,5,6,7, 8, 9, 10].includes(selected)) {
            setSelectedByIndex(3)
        }
        if ([18, 19, 20].includes(selected)) {
            setSelectedByIndex(17)
        }
        if ([28, 29, 30].includes(selected)) {
            setSelectedByIndex(27)
        }
        if ([38, 39, 40].includes(selected)) {
            setSelectedByIndex(37)
        }
        if (selected > 40) {
            setSelectedByIndex(40)
        }
    }, [setSelectedByIndex]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-teal-900 text-white p-6 ">
            <div className="flex flex-row align-center items-center justify-center space-x-4">
                <div className={`${selected === 'search-back' && "border-4 border-blue-500"} rounded-full flex justify-center`}>
                    <ArrowLeftCircleFill
                        className='h-8 w-8 text-gray-300'
                        onClick={() => navigate('/')}/>
                </div>
                <input
                    className={`${selected === 'search-search' && "border-4 border-blue-500"} bg-gray-700 rounded-3xl text-left py-2 px-6 text-xl w-150 focus:outline-none focus:border-4 focus:border-blue-500`}
                    type="text"
                    value={textContent}
                    onChange={(e) => dispatch(setSearchText(e.target.value))}
                    placeholder="Search"
                    onKeyUp={handleKeyUp}
                />
                <div
                    className={`h-10 w-10 ${selected === 'search-mic' && "border-4 border-blue-500 "} rounded-full flex justify-center`}>
                    <MicButton isLoading={isLoading} record={selected === 'search-mic' && entered}/>
                </div>
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