import {motion} from "framer-motion";
import {PinFill} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import type {Game} from "../types.ts";
import {setSelected} from "../redux/slices/selection.ts";
import {type RootState} from "../redux/store.ts";

export default function GameRow() {
    const dispatch = useDispatch();
    const {selected, entered} = useSelector((state: RootState) => state.selection);
    const {games} = useSelector((state: RootState) => state.home);


    return <div data-testid="game-row"
                className="absolute w-full padding-4 bottom-50 left-10 flex items-end space-x-8 overflow-hidden">
        {games.map((game) => (
            <motion.div
                animate={{
                    width: selected === game.id ? "calc(100% / 6)" : "calc(100% / 12)",
                    height: selected === game.id ? "calc(100% / 6)" : "calc(100% / 12)",
                    scale: entered == game.index ? 0.95 : 1
                }}
                key={game.id}
                className={`relative rounded-lg justify-around overflow-hidden cursor-pointer items-end origin-bottom ${
                    selected === game.id ? "border-4 border-blue-500 " : ""
                }`}
                onClick={() => dispatch(setSelected(game.id))}
                whileTap={{scale: 0.95}}
            >
                <div className="relative w-full pb-[100%]">
                    <img key={game.name} src={game.image_path} alt={game.name}
                         className="absolute top-0 left-0 w-full h-full object-cover object-top"/>
                </div>
                <div key={`${game.name}-pin`} className={`absolute bottom-2 right-2 ${!game.pin && 'hidden'}`}>
                    <PinFill/>
                </div>
                <div key={`${game.name}-name`}
                     className={`absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-center ${
                         selected === game.id || "hidden"
                     }`}>
                    {game.name}
                </div>
            </motion.div>
        ))}
    </div>
}