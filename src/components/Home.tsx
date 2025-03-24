import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import dayjs from "dayjs";
import {Collection, Shop, Ticket, Search, Gear, Headset} from 'react-bootstrap-icons';
import Menu from './Menu.tsx'
import type {Selectable} from "../types.ts";
import type {RootState} from "../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import FeaturedRow from "./FeaturedRow.tsx";
import GameRow from "./GameRow.tsx";
import {setEntered, setMenu, setSelected} from "../redux/slices/selection.ts";
import {setGames} from "../redux/slices/home.ts";
import {useNavigate} from "react-router";
import {useGlobalKeyPress} from "../hooks/keys.ts";


export default function XboxHome() {
    const dispatch = useDispatch();
    const {games, featured} = useSelector((state: RootState) => state.home);
    const {selected, entered, menu} = useSelector((state: RootState) => state.selection);
    const [time, setTime] = useState(dayjs().format("h:mm A"));
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const menuItems: Selectable[] = [
        {id: "menu-collection", index: 2, icon: <Collection/>, onClick: () => dispatch(setSelected("menu-collection"))},
        {id: "menu-shop", index: 3, icon: <Shop/>, onClick: () => dispatch(setSelected("menu-shop"))},
        {id: "menu-ticket", index: 4, icon: <Ticket/>, onClick: () => dispatch(setSelected("menu-ticket"))},
        {id: "menu-search", index: 5, icon: <Search/>, onClick: () => navigate("/search")},
        {id: "menu-gear", index: 6, icon: <Gear/>, onClick: () => dispatch(setSelected("menu-gear"))}
    ].map(m => ({...m, key: m.id}))

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format("h:mm A"));
        }, 60000);
        dispatch(setSelected("home-profile"))
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (entered) {
            if (selected === "menu-search") {
                navigate("/search")
                dispatch(setEntered(false))
            }
        }
    }, [entered]);

    useEffect(() => {
        if (menu) {
            if (selected?.includes('game-')) {
                setMenuOpen(true);
                setMenu(1);
            }
        } else {
            setMenuOpen(false);
            setEntered(null);
        }
    }, [menu]);


    function pinGame() {
        const game = getSelectedGame();
        if (game) {
            dispatch(setGames([{...game, pin: !game['pin']}, ...games.filter(g => g.id !== game.id)]))
        }
        setMenuOpen(false);
        dispatch(setMenu(0));
        dispatch(setEntered(0));
    }

    const getSelectedGame = () => games.find(g => g.id === selected);

    const navigables = [{index: 1, id: "home-profile"}, ...menuItems, ...games, ...featured]
    const setSelectedByIndex = (idx) => {
        if (!!idx) {
            console.log(`Selecting Index: ${idx}`)
            dispatch(setSelected(navigables.find(n => n.index === idx)?.id));
        }
    }
    const getSelectedIndex = () => {
        console.log(`selected: ${selected}`)
        if(selected) {
            const found = navigables.find(n => n.id === selected)?.index
            console.log(`Returning found ${found}`)
            return found
        }
    }
    useGlobalKeyPress(getSelectedIndex, setSelectedByIndex);

    useEffect(() => {
        if ([7, 8, 9, 10].includes(selected)) {
            setSelectedByIndex(6)
        }
        if ([25, 26, 27, 28, 29].includes(selected)) {
            setSelectedByIndex(24)
        }
    }, [setSelectedByIndex]);

    return (
        <div className="w-full h-screen">
            {/* Background Image */}
            {/*<div className="absolute inset-0 bg-cover bg-center"/>*/}
            {/* Top Navigation */}
            <div className="w-full flex flex-row justify-between pl-6 m-2 pr-6">
                <div className="flex items-center text-white"
                     onClick={() => dispatch(setSelected("home-profile"))}>
                    <img src="/profile.png" alt="User" className={`w-12 h-12 rounded-full mr-2 ${
                        selected === "home-profile" ? "border-4 border-blue-500 " : ""
                    }`}/>
                    <div className="text-left">
                        <p className="font-semibold">Joseph Svrcek</p>
                        <p className="text-sm text-gray-300">joesvrcek@hotmail.com</p>
                    </div>
                </div>


                <div className="flex items-center text-white">
                    {menuItems.map((menuItem) => (
                        <motion.div
                            animate={{scale: entered == menuItem.index ? 0.95 : 1}}
                            key={menuItem.id}
                            className={`d-flex mt-4 m-2 justify-content-center align-items-center rounded-full cursor-pointer ${
                                selected === menuItem.id ? "border-4 border-blue-500 " : ""
                            }`}
                            onClick={menuItem['onClick']}
                            whileTap={{scale: 0.95}}
                        >
                            <div className="circle">
                                {menuItem.icon}
                            </div>
                        </motion.div>

                    ))}
                </div>

                <div className='top-4 right-4 text-white flex items-center'>
                    <Headset className="m-2"/>
                    {time}
                </div>
            </div>

            <GameRow/>
            <FeaturedRow/>

            <div className="flex justify-center items-center h-screen">
                <Menu isOpen={isMenuOpen} title={getSelectedGame()?.name} selectedIndex={menu} pin={(pinGame)}
                      isPinned={getSelectedGame()?.['pin']} click={entered}/>
            </div>
        </div>
    );
}

