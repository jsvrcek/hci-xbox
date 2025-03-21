import {motion} from "framer-motion";
import {PinFill} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import type {Game} from "../types.ts";
import {setSelected} from "../redux/slices/selection.ts";
import {type RootState} from "../redux/store.ts";

export default function GameRow() {
    const dispatch = useDispatch();
    const selectedId = useSelector((state: RootState) => state.selection.selected);
        const {games} = useSelector((state: RootState) => state.home);


    return <div key="game-row-div"
        className="absolute w-full padding-4 bottom-50 left-10 flex items-end space-x-8 overflow-hidden">
        {games.map((game) => (
            <motion.div
                animate={{
                    width: selectedId === game.id ? "calc(100% / 6)" : "calc(100% / 12)",
                    height: selectedId === game.id ? "calc(100% / 6)" : "calc(100% / 12)"
                }}
                key={game.id}
                className={`relative rounded-lg justify-around overflow-hidden cursor-pointer items-end origin-bottom ${
                    selectedId === game.id ? "border-4 border-blue-500 " : ""
                }`}
                onClick={() => dispatch(setSelected(game.id))}
                whileTap={{scale: 0.95}}
            >
                <img key={game.name} src={game.image} alt={game.name} className="w-full h-full object-cover"/>
                <div key={`${game.name}-pin`} className={`absolute bottom-2 right-2 ${!game.pin && 'hidden'}`}>
                    <PinFill/>
                </div>
                <div key={`${game.name}-name`}
                    className={`absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-center ${
                        selectedId === game.id || "hidden"
                    }`}>
                    {game.name}
                </div>
            </motion.div>
        ))}
    </div>
}