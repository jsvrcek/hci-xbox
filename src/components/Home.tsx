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
import {setSelected} from "../redux/slices/selection.ts";
import {setGames} from "../redux/slices/home.ts";
import {useNavigate} from "react-router";


let gamepad = null;

export default function XboxHome() {
    const dispatch = useDispatch();
    const {games} = useSelector((state: RootState) => state.home);
    const {selected} = useSelector((state: RootState) => state.selection);
    const [time, setTime] = useState(dayjs().format("h:mm A"));
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const menuItems: Selectable[] = [
        {id: "menu-collection", index: 2, icon: <Collection/>},
        {id: "menu-shop", index: 3, icon: <Shop/>},
        {id: "menu-ticket", index: 4, icon: <Ticket/>},
        {id: "menu-search", index: 5, icon: <Search/>, onClick: navigate("/games")},
        {id: "menu-gear", index: 6, icon: <Gear/>}
    ].map(m => ({...m, key: m.id}))
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format("h:mm A"));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if ([7, 8, 9, 10].includes(selected)) {
            dispatch(setSelected(6))
        }
        if ([25, 26, 27, 28, 29].includes(selected)) {
            dispatch(setSelected(24))
        }
    }, [selected]);


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isMenuOpen) {
                handleModalMenu(event);
            } else {
                handleHomeMenu(event);
            }

        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selected]);

    const handleModalMenu = (event) => {
        switch (event.key) {
            case "ArrowDown" || gamepad?.buttons[11]?.pressed:
                dispatch(setSelected(selected + 10 < 30 ? selected + 10 : selected));
                break;
            case "ArrowUp" || gamepad?.buttons[10]?.pressed:
                dispatch(setSelected(selected - 10 > 0 ? selected - 10 : selected));
                break;
            case "Enter" || gamepad?.buttons[7]?.pressed:
                setMenuOpen(true);
                break;
            default:
                return;
        }
    };

    const handleHomeMenu = (event) => {
        switch (event.key) {
            case "ArrowRight" || gamepad?.buttons[13]?.pressed:
                dispatch(setSelected(selected + 1 < 25 ? selected + 1 : selected));
                break;
            case "ArrowLeft" || gamepad?.buttons[12]?.pressed:
                dispatch(setSelected(selected - 1 > 0 ? selected - 1 : selected));
                break;
            case "ArrowDown" || gamepad?.buttons[11]?.pressed:
                dispatch(setSelected(selected + 10 < 30 ? selected + 10 : selected));
                break;
            case "ArrowUp" || gamepad?.buttons[10]?.pressed:
                dispatch(setSelected(selected - 10 > 0 ? selected - 10 : selected));
                break;
            case "Enter" || gamepad?.buttons[7]?.pressed:
                setMenuOpen(true);
                break;
            default:
                return;
        }
    };

    function pinGame() {
        const game = getSelectedGame();
        if (game) {
            dispatch(setGames([{...game, pin: !game['pin']}, ...games.filter(g => g.id !== game.id)]))
        }
        setMenuOpen(false);
    }


    function gamepadHandler() {
        gamepad = navigator.getGamepads().find(g => g?.buttons?.length > 1);
        if (gamepad) {
            // Joystick movements
            const leftStickX = gamepad.axes[0]; // Left stick X axis
            const leftStickY = gamepad.axes[1]; // Left stick Y axis
            const rightStickX = gamepad.axes[2]; // Right stick X axis
            const rightStickY = gamepad.axes[3]; // Right stick Y axis

            // Buttons (example for button A)
            const buttonA = gamepad.buttons[0].pressed; // Button A is at index 0
            const buttonB = gamepad.buttons[1].pressed; // Button B is at index 0
            const buttonUp = gamepad.buttons[10].pressed;
            const buttonDown = gamepad.buttons[11].pressed;
            const buttonLeft = gamepad.buttons[12].pressed;
            const buttonRight = gamepad.buttons[13].pressed;

            requestAnimationFrame(gamepadHandler); // Keep polling
        }
    }

    if ("getGamepads" in navigator) {
        gamepadHandler(); // Start polling
    } else {
        console.log("Gamepad API not supported.");
    }

    const getSelectedGame = () => games.find(g => g.id === selected);

    return (
        <div className="w-full h-screen">
            {/* Background Image */}
            {/*<div className="absolute inset-0 bg-cover bg-center"/>*/}
            {/* Top Navigation */}
            <div className="w-full flex flex-row justify-between pl-6 m-2 pr-6">
                <div className="flex items-center text-white"
                     onClick={() => dispatch(setSelected(1))}>
                    <img src="/profile.png" alt="User" className={`w-12 h-12 rounded-full mr-2 ${
                        selected === 1 ? "border-4 border-blue-500 " : ""
                    }`}/>
                    <div className="text-left">
                        <p className="font-semibold">Joseph Svrcek</p>
                        <p className="text-sm text-gray-300">joesvrcek@hotmail.com</p>
                    </div>
                </div>


                <div className="flex items-center text-white">
                    {menuItems.map((menuItem) => (
                        <motion.div
                            key={menuItem.id}
                            className={`d-flex mt-4 m-2 justify-content-center align-items-center rounded-full cursor-pointer ${
                                selected === menuItem.id ? "border-4 border-blue-500 " : ""
                            }`}
                            onClick={() => menuItems['onClick']?.() || () => dispatch(setSelected(menuItem.id))}
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
                <Menu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} pin={(pinGame)}
                      isPinned={getSelectedGame()?.['pin']}/>
            </div>
        </div>
    );
}

