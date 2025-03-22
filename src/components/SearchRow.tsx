import {motion} from "framer-motion";
import {PinFill} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import type {Game} from "../types.ts";
import {setSelected} from "../redux/slices/selection.ts";
import {type RootState} from "../redux/store.ts";
import React from "react";

export default function SearchRow() {
    const {games} = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();
    const selectedId = useSelector((state: RootState) => state.selection.selected);


    return <div className="mt-6 grid grid-cols-6 gap-4 justify-center">
        {games.map((game) => (
            <motion.div onClick={() => dispatch(setSelected(game.id))}
                        whileTap={{scale: 0.95}}
                        className={`rounded-lg ${selectedId === game.id ? "border-4 border-blue-500 " : ""}`}
            >
                <div key={game.id} className="bg-gray-900 h-full rounded-lg overflow-hidden p-3">
                    <img key={game.name} src={game.image_path} alt={game.name}
                         className="w-full h-[70%] object-cover mx-auto"/>
                    <h3 className="mt-2 text-left">{game.title}</h3>
                    {/*<div className="flex justify-between mt-2 text-sm text-gray-400">*/}
                    {/*  <span>{game.price}</span>*/}
                    {/*  {game.discount && <span className="text-yellow-500">{game.discount}</span>}*/}
                    {/*</div>*/}
                </div>
            </motion.div>
        ))}
    </div>
}