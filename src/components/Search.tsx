import React from "react";

const games = [
  {
    id: 1,
    title: "Rayman Legends",
    price: "$3.99",
    discount: "-80%",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8a/Rayman_Legends_Box_Art.jpg"
  },
  {
    id: 2,
    title: "Guacamelee! 2",
    price: "$19.99",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8a/Guacamelee_2_cover.jpg"
  },
];

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-teal-900 text-white p-6">
      {/* Search Bar */}
      <div className="bg-gray-700 rounded-lg text-center py-2 px-6 text-xl max-w-2xl mx-auto">
        Two Player Metroidvania for kids
      </div>

      {/* Navigation */}
      <nav className="flex justify-center space-x-6 mt-6">
        {["Top Results", "Games", "People", "Installed", "Movies & TV", "Apps", "Settings"].map((tab) => (
          <button key={tab} className="text-gray-300 hover:text-white">{tab}</button>
        ))}
      </nav>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {["Two Player", "Action", "Rated: E", "Rated: E10+", "Side Scroller", "Keyword: Metroidvania"].map((filter) => (
          <button key={filter} className="bg-gray-800 px-4 py-2 rounded-lg">{filter}</button>
        ))}
      </div>

      {/* Game List */}
      <div className="mt-6 grid grid-cols-3 gap-4 justify-center">
        {games.map((game) => (
          <div key={game.id} className="bg-gray-900 rounded-lg overflow-hidden p-3">
            <img src={game.image} alt={game.title} className="w-32 h-32 object-cover mx-auto" />
            <h3 className="mt-2 text-center">{game.title}</h3>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>{game.price}</span>
              {game.discount && <span className="text-yellow-500">{game.discount}</span>}
            </div>
          </div>
        ))}

        {/* Browse Store Card */}
        <div className="bg-gray-800 w-32 h-32 flex items-center justify-center text-gray-400 rounded-lg">
          Browse the Store
        </div>
      </div>
    </div>
  );
};

export default SearchPage;