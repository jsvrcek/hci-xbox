import {useState} from "react";
import {Controller, Plus, House, Shop, QuestionCircle, PinFill, PinAngle} from "react-bootstrap-icons";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {setSearchText} from "../redux/slices/search.ts";
import {setMenu} from "../redux/slices/selection.ts";

interface MenuProps {
  title: string;
  isOpen: boolean;
  pin: () => void;
  isPinned: boolean;
  selectedIndex: number;
  click: boolean;
}
export default ({title, isOpen, pin, isPinned, selectedIndex, click}: MenuProps) => {
    if (!isOpen) return null;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menuItems = [{
        index: 1, onClick: () => {
        }, content: <><Controller/> Game Card</>
    },
        {index: 2, onClick: pin, content: isPinned ? (<><PinAngle/> Unpin Game </>) : (<><PinFill/> Pin Game </>)},
        {
            index: 3, onClick: () => {
            }, content: <><Plus/> Add to a group</>
        },
        {
            index: 4, onClick: () => {
            }, content: <><House/> Add to Home</>
        },
        {
            index: 5, onClick: () => {
                dispatch(setSearchText(`Find similar games to ${title}`))
                dispatch(setMenu(0));
                isOpen = false;
                navigate('/search');
            }, content: <><Shop/> Find Similar Games</>
        },
        {
            index: 6, onClick: () => {
            }, content: <><Controller/> Manage game and add-ons</>
        },
        // {
        //     index: 7, onClick: () => {
        //     }, content: <><QuestionCircle/> Xbox Support</>
        // }
    ]
    if (click) {
        for (const menuItem of menuItems) {
            if (menuItem.index === selectedIndex) {
                menuItem.onClick();
            }
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20">
            <div className="bg-[#919191] text-white p-4 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold">{title}</h2>
                <ul className="mt-3 space-y-2">
                    {menuItems.map((menuItem) => (
                        <li onClick={menuItem.onClick}
                            className={`${selectedIndex === menuItem.index ? "border-4 border-blue-500" : ""} flex items-center gap-2 cursor-pointer hover:border-4 hover:border-blue-500  p-2 rounded`}>
                            {menuItem.content}
                        </li>
                    ))}
                </ul>
                <hr className="my-2 border-gray-600"/>
                <div
                    className={`${selectedIndex === 7 ? "border-4 border-blue-500" : ""} flex items-center gap-2 cursor-pointer hover:border-4 hover:border-blue-500  p-2 rounded`}>
                    <QuestionCircle/> Xbox Support
                </div>
            </div>
        </div>
    );
};
