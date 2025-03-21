import {motion} from "framer-motion";
import {PinFill} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import type {Game, Selectable} from "../types.ts";
import {setSelected} from "../redux/slices/selection.ts";
import {type RootState} from "../redux/store.ts";

export default function FeaturedRow() {
    const dispatch = useDispatch();
    const selectedId = useSelector((state: RootState) => state.selection.selectedId);
    const {featured} = useSelector((state: RootState) => state.home);

    return (
        <div
            className="absolute w-full padding-4 bottom-0 left-10 flex items-end origin-center space-x-4 overflow-hidden">
            {featured.map((feature) => (
                <motion.div
                    key={feature.id}
                    animate={{
                        width: selectedId === feature.id ? "calc(100% / 3)" : "calc(80% / 4)",
                        height: selectedId === feature.id ? "calc(100% / 3)" : "calc(80% / 4)"
                    }}
                    className={`relative rounded-lg overflow-hidden justify-around cursor-pointer items-center  ${
                        selectedId === feature.id ? "border-4 border-blue-500 " : ""
                    }`}
                    onClick={() => setSelected(feature.id)}
                    whileTap={{scale: 0.95}}
                >
                    <img src={feature.img} alt={feature.name} className="w-full h-full object-cover"/>
                    <div
                        className={`absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-center ${
                            selectedId === feature.id || "hidden"
                        }`}>
                        {feature.name}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}