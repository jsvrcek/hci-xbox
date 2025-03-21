import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import dayjs from "dayjs";
import {Collection, Shop, Ticket, Search, Gear, Headset, PinFill} from 'react-bootstrap-icons';
import Menu from './Menu.tsx'

const menuItems = [
    {id: 2, icon: <Collection/>},
    {id: 3, icon: <Shop/>},
    {id: 4, icon: <Ticket/>},
    {id: 5, icon: <Search/>},
    {id: 6, icon: <Gear/>},
];

let games = [
    {id: 11, name: "Elden Ring", img: "/eldenring.png", pin: false},
    {id: 12, name: "Roblox", img: "/roblox.png", pin: false},
    {id: 13, name: "Gang Beasts", img: "/gangbeasts.png", pin: false},
    {id: 14, name: "Lonely Mountains", img: "/lmsr.png", pin: false},
    {id: 15, name: "Golf With Your Friends", img: "/golfwithyourfriends.png", pin: false},
    {id: 16, name: "Geometry Wars 2", img: "/geowars2.png", pin: false},
    {id: 17, name: "Cassette Beasts", img: "/cassettebeasts.png", pin: false},
    {id: 18, name: "Kingdom: Two Crowns", img: "/kingdom.png", pin: false},
    {id: 19, name: "Little Kitty Big City", img: "/littlekitty.png", pin: false},
];

let features = [
    {id: 21, name: "Browse the store", img: "/browseStore.png"},
    {id: 22, name: "Play Avowed Now", img: "/avowedfeat.png"},
    {id: 23, name: "Test Your Relationship", img: "/relationshipFeat.png"},
    {id: 24, name: "Play Khazan", img: "/playKhazan.png"},
];

let gamepad = null;

export default function XboxHome() {
    const [selected, setSelected] = useState<number>(1);
    const [time, setTime] = useState(dayjs().format("h:mm A"));
    const [isMenuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format("h:mm A"));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if ([7, 8, 9, 10].includes(selected)) {
            setSelected(6)
        }
        if ([25, 26, 27, 28, 29].includes(selected)) {
            setSelected(24)
        }
    }, [selected]);


    useEffect(() => {
        const handleKeyDown = (event) => {
            if(isMenuOpen){
                handleModalMenu(event);
            }else {
                handleHomeMenu(event);
            }

        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selected]);

    const handleModalMenu = (event ) => {
        switch (event.key) {
                case "ArrowDown" || gamepad?.buttons[11]?.pressed:
                    setSelected(selected + 10 < 30 ? selected + 10 : selected);
                    break;
                case "ArrowUp" || gamepad?.buttons[10]?.pressed:
                    setSelected(selected - 10 > 0 ? selected - 10 : selected);
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
                    setSelected(selected + 1 < 25 ? selected + 1 : selected);
                    break;
                case "ArrowLeft" || gamepad?.buttons[12]?.pressed:
                    setSelected(selected - 1 > 0 ? selected - 1 : selected);
                    break;
                case "ArrowDown" || gamepad?.buttons[11]?.pressed:
                    setSelected(selected + 10 < 30 ? selected + 10 : selected);
                    break;
                case "ArrowUp" || gamepad?.buttons[10]?.pressed:
                    setSelected(selected - 10 > 0 ? selected - 10 : selected);
                    break;
                case "Enter" || gamepad?.buttons[7]?.pressed:
                    setMenuOpen(true);
                    break;
                default:
                    return;
            }
    };

    function pinGame(){
        const game = getSelectedGame();
        if(game) {
            game['pin'] = !game['pin'];
        }
        sortPinnedGames();
        setMenuOpen(false);
    }

    function sortPinnedGames(){
        const pinned = games.filter(g => g.pin);
        const unpinned = games.filter(g => !g.pin);
        games = [...pinned,... unpinned];
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
                     onClick={() => setSelected(1)}>
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
                            onClick={() => setSelected(menuItem.id)}
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
            {/* Game Tiles */}
            <div
                className="absolute w-full padding-4 bottom-50 left-10 flex items-end space-x-8 overflow-hidden">
                {games?.map((game) => (
                    <motion.div
                        animate={{
                            width: selected === game.id ? "calc(100% / 6)" : "calc(100% / 12)",
                            height: selected === game.id ? "calc(100% / 6)" : "calc(100% / 12)"
                        }}
                        key={game.id}
                        className={`relative rounded-lg justify-around overflow-hidden cursor-pointer items-end origin-bottom ${
                            selected === game.id ? "border-4 border-blue-500 " : ""
                        }`}
                        onClick={() => setSelected(game.id)}
                        whileTap={{scale: 0.95}}
                    >
                        <img src={game.img} alt={game.name} className="w-full h-full object-cover"/>
                        <div className={`absolute bottom-2 right-2 ${!game.pin && 'hidden'}`}>
                            <PinFill/>
                        </div>
                        <div
                            className={`absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-center ${
                                selected === game.id || "hidden"
                            }`}>
                            {game.name}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Feature Tiles */}
            <div
                className="absolute w-full padding-4 bottom-0 left-10 flex items-end origin-center space-x-4 overflow-hidden">
                {features.map((feature) => (
                    <motion.div
                        key={feature.id}
                        animate={{
                            width: selected === feature.id ? "calc(100% / 3)" : "calc(80% / 4)",
                            height: selected === feature.id ? "calc(100% / 3)" : "calc(80% / 4)"
                        }}
                        // animate={{
                        //     width: selected === feature.id ? 300 : 250,
                        //     height: selected === feature.id ? 150 : 125
                        // }}
                        className={`relative rounded-lg overflow-hidden justify-around cursor-pointer items-center  ${
                            selected === feature.id ? "border-4 border-blue-500 " : ""
                        }`}
                        onClick={() => setSelected(feature.id)}
                        whileTap={{scale: 0.95}}
                    >
                        <img src={feature.img} alt={feature.name} className="w-full h-full object-cover"/>
                        <div
                            className={`absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-center ${
                                selected === feature.id || "hidden"
                            }`}>
                            {feature.name}
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-center items-center h-screen">
                <Menu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} pin={(pinGame)} isPinned={getSelectedGame()?.['pin']}/>
            </div>
        </div>
    );
}

