import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import dayjs from "dayjs";

const games = [
  { id: 1, name: "Elden Ring", img: "/eldenring.png" },
  { id: 2, name: "Roblox", img: "/roblox.png" },
  { id: 3, name: "Gang Beasts", img: "/gangbeasts.png" },
  { id: 4, name: "Lonely Mountains", img: "/lmsr.png" },
  { id: 5, name: "Golf With Your Friends", img: "/golfwithyourfriends.png" },
  { id: 5, name: "Geometry Wars 2", img: "/geowars2.png" },
  { id: 5, name: "Cassette Beasts", img: "/cassettebeasts.png" },
  { id: 5, name: "Kingdom: Two Crowns", img: "/kingdom.png" },
  { id: 5, name: "Little Kitty Big City", img: "/littlekitty.png" },
];

const features = [
  { id: 1, name: "Browse the store", img: "/browseStore.png" },
  { id: 2, name: "Play Avowed Now", img: "/avowedfeat.png" },
  { id: 3, name: "Test Your Relationship", img: "/relationshipFeat.png" },
  { id: 4, name: "Play Khazan", img: "/playKhazan.png" },
];


export default function XboxHome() {
  const [selected, setSelected] = useState(0);
  const [time, setTime] = useState(dayjs().format("h:mm A"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("h:mm A"));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="w-full h-screen bg-black">
          {/* Background Image */}
          <div
              className="absolute inset-0 bg-cover bg-center"
          />

          {/* Top Navigation */}
          <div className="absolute top-4 left-4 flex items-center text-white">
              <img src="/profile.png" alt="User" className="w-12 h-12 rounded-full mr-2"/>
              <div>
                  <p className="font-semibold">Joseph Svrcek</p>
                  <p className="text-sm text-gray-300">joesvrcek@hotmail.com</p>
              </div>
          </div>

          <div className="absolute top-4 right-4 text-white">{time}</div>

          {/* Game Tiles */}
          <div className="absolute bottom-50 left-10 flex space-x-4 overflow-hidden">
              {games.map((game, index) => (
                  <motion.div
                      key={game.id}
                      className={`relative w-32 h-32 rounded-lg overflow-hidden cursor-pointer ${
                          selected === index ? "border-4 border-green-500 scale-110" : ""
                      }`}
                      onClick={() => setSelected(index)}
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.95}}
                  >
                      <img src={game.img} alt={game.name} className="w-full h-full object-cover"/>
                      <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                          {game.name}
                      </div>
                  </motion.div>
              ))}
          </div>

          {/* Feature Tiles */}
          <div className="absolute bottom-0 left-10 flex space-x-4">
              {features.map((game, index) => (
                  <motion.div
                      key={game.id}
                      className={`relative w-64 h-32 rounded-lg overflow-hidden cursor-pointer ${
                          selected === index ? "border-4 border-green-500 scale-110" : ""
                      }`}
                      onClick={() => setSelected(index)}
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.95}}
                  >
                      <img src={game.img} alt={game.name} className="w-full h-full object-cover"/>
                      <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                          {game.name}
                      </div>
                  </motion.div>
              ))}
          </div>
      </div>
  );
}
