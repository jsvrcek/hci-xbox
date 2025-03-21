import { useState } from "react";
import {Controller, Plus, House, Shop, QuestionCircle, PinFill, PinAngle} from "react-bootstrap-icons";

export default ({ isOpen, onClose, pin, isPinned, selected }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20">
      <div className="bg-[#919191] text-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold">Lonely Mountains: Sno...</h2>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
            <Controller /> Game Card
          </li>
          <li onClick={pin} className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
            {isPinned ?  (<><PinAngle /> Unpin Game </>) : (<><PinFill /> Pin Game </>)}
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
            <Plus /> Add to a group
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
            <House /> Add to Home
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
            <Shop /> Find Similar Games
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
            <Controller /> Manage game and add-ons
          </li>
        </ul>
        <hr className="my-2 border-gray-600" />
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <QuestionCircle /> Xbox Support
        </div>
        <button onClick={onClose} className="mt-3 w-full bg-gray-600 hover:bg-gray-500 p-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};
