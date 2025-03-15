import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const games = [
  { id: 1, name: "Elden Ring", img: "/eldenring.jpg" },
  { id: 2, name: "Roblox", img: "/roblox.jpg" },
  { id: 3, name: "Gang Beasts", img: "/gangbeasts.jpg" },
  { id: 4, name: "Lonely Mountains", img: "/lonelymountains.jpg" },
  { id: 5, name: "Golf Adventure", img: "/golf.jpg" },
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
      <div className="relative w-full h-screen bg-black">
          {/* Background Image */}
          <div
              className="absolute inset-0 bg-cover bg-center"
              style={{backgroundImage: "url(/eldenring-bg.jpg)"}}
          />

          {/* Top Navigation */}
          <div className="absolute top-4 left-4 flex items-center text-white">
              <img src="/profile.jpg" alt="User" className="w-12 h-12 rounded-full mr-2"/>
              <div>
                  <p className="font-semibold">Joseph Svrcek</p>
                  <p className="text-sm text-gray-300">joesvrcek@hotmail.com</p>
              </div>
          </div>

          <div className="absolute top-4 right-4 text-white">{time}</div>

          {/* Game Tiles */}
          <div className="absolute bottom-40 left-10 flex space-x-4 overflow-hidden">
              {games.map((game, index) => (
                  <motion.div
                      key={game.id}
                      className={`relative w-36 h-48 rounded-lg overflow-hidden cursor-pointer ${
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
          <div className="absolute bottom-10 left-10 flex space-x-4">
              <div className="w-64 h-36 bg-purple-700 rounded-lg flex items-center justify-center text-white">
                  Browse the store
              </div>
              <div className="w-64 h-36 bg-gray-800 rounded-lg flex items-center justify-center text-white">
                  Play Avowed now
              </div>
              <div className="w-64 h-36 bg-yellow-600 rounded-lg flex items-center justify-center text-white">
                  Test your relationship
              </div>
          </div>
      </div>
  );
}
