import {motion} from "framer-motion";
import {PinFill} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import type {Game, Selectable} from "../types.ts";
import {setSelected} from "../redux/slices/selection.ts";
import {type RootState} from "../redux/store.ts";

export default function FeaturedRow() {
    const dispatch = useDispatch();
    const {selected, entered} = useSelector((state: RootState) => state.selection);
    const {featured} = useSelector((state: RootState) => state.home);

    return (
        <div
            className="absolute w-full padding-4 bottom-0 left-10 flex items-end origin-center space-x-4 overflow-hidden">
            {featured.map((feature) => (
                <motion.div
                    key={feature.id}
                    animate={{
                        width: selected === feature.id ? "calc(100% / 3)" : "calc(80% / 4)",
                        height: selected === feature.id ? "calc(100% / 3)" : "calc(80% / 4)",
                        scale: entered == feature.index ? 0.95 : 1
                    }}
                    className={`relative rounded-lg overflow-hidden justify-around cursor-pointer items-center  ${
                        selected === feature.id ? "border-4 border-blue-500 " : ""
                    }`}
                    onClick={() => dispatch(setSelected(feature.id))}
                    whileTap={{scale: 0.95}}
                >
                    <img src={feature.image_path} alt={feature.name} className="w-full h-full object-cover"/>
                    <div
                        className={`absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-center ${
                            selected === feature.id || "hidden"
                        }`}>
                        {feature.name}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}