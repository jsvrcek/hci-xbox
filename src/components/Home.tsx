import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import dayjs from "dayjs";
import {Collection, Shop, Ticket, Search, Gear, Headset} from 'react-bootstrap-icons';


const menuItems = [
    {id: 3, icon: <Collection/>},
    {id: 4, icon: <Shop/>},
    {id: 5, icon: <Ticket/>},
    {id: 6, icon: <Search/>},
    {id: 7, icon: <Gear/>},
];

const games = [
    {id: 11, name: "Elden Ring", img: "/eldenring.png"},
    {id: 12, name: "Roblox", img: "/roblox.png"},
    {id: 13, name: "Gang Beasts", img: "/gangbeasts.png"},
    {id: 14, name: "Lonely Mountains", img: "/lmsr.png"},
    {id: 15, name: "Golf With Your Friends", img: "/golfwithyourfriends.png"},
    {id: 16, name: "Geometry Wars 2", img: "/geowars2.png"},
    {id: 17, name: "Cassette Beasts", img: "/cassettebeasts.png"},
    {id: 18, name: "Kingdom: Two Crowns", img: "/kingdom.png"},
    {id: 19, name: "Little Kitty Big City", img: "/littlekitty.png"},
];

const features = [
    {id: 21, name: "Browse the store", img: "/browseStore.png"},
    {id: 23, name: "Play Avowed Now", img: "/avowedfeat.png"},
    {id: 26, name: "Test Your Relationship", img: "/relationshipFeat.png"},
    {id: 29, name: "Play Khazan", img: "/playKhazan.png"},
];

export default function XboxHome() {
    const [selected, setSelected] = useState<number>();
    const [time, setTime] = useState(dayjs().format("h:mm A"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format("h:mm A"));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {


            switch (event.key) {
                case "ArrowRight":
                    setSelected(selected < 9 ? selected + 1 : selected);
                    break;
                case "ArrowLeft":
                    setSelected(selected > 1 ? selected - 1 : selected);
                    break;
                case "ArrowDown":
                    setSelected(selected < 10 ? selected + 10 : selected);
                    break;
                case "ArrowUp":
                    setSelected(selected > 10 ? selected - 10 : selected);
                    break;
                default:
                    return;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="w-full h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center"/>

            {/* Top Navigation */}
            <div className="w-full flex">
                <div className="absolute top-4 left-4 flex items-center text-white"
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

                <div className={`absolute top-4 right-4 text-white flex items-center ${
                    selected === 7 ? "border-4 border-blue-500 " : ""
                }`}>
                    <Headset className="m-2"/>
                    {time}
                </div>
            </div>
            {/* Game Tiles */}
            <div
                className="absolute w-full padding-4 bottom-50 left-10 flex items-end space-x-4 overflow-hidden">
                {games.map((game) => (
                    <motion.div
                        animate={{width: selected === game.id ? 200 : 100, height: selected === game.id ? 200 : 100}}
                        key={game.id}
                        className={`relative rounded-lg justify-around overflow-hidden cursor-pointer items-end origin-bottom ${
                            selected === game.id ? "border-4 border-blue-500 " : ""
                        }`}
                        onClick={() => setSelected(game.id)}
                        whileTap={{scale: 0.95}}
                    >
                        <img src={game.img} alt={game.name} className="w-full h-full object-cover"/>
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
                className="absolute w-full padding-4 bottom-0 left-10 flex items-end origin-center space-x-4">
                {features.map((feature) => (
                    <motion.div
                        key={feature.id}
                        animate={{
                            width: selected === feature.id ? 300 : 250,
                            height: selected === feature.id ? 150 : 125
                        }}
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
        </div>
    );
}
