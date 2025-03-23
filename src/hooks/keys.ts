// gamepad.js
// Define different actions for each button/key
import {useEffect} from "react";
import {setEntered, setMenu} from "../redux/slices/selection.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {debounce} from 'lodash-es';

export function useGlobalKeyPress(getSelected, setSelected) {
    const dispatch = useDispatch();
    const {menu} = useSelector((state: RootState) => state.selection);
    // const [pressedButtons, pressedButtons = useState(new Set());
    let pressedButtons = new Set();

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            keyPressHandler(event);
        };
        window.addEventListener("gamepadconnected", (event) => {
            console.log("Gamepad connected:", event.gamepad);
            checkGamepad(); // Start checking inputs
        });
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [checkGamepad, keyPressHandler]);

    function actionForArrowLeft() {
        console.log("Action for Left Arrow (D-pad Left)");
        setSelected(getSelected() - 1 > 0 ? getSelected() - 1 : getSelected());
    }

    function actionForArrowRight() {
        console.log("Action for Right Arrow (D-pad Right)");
        setSelected(getSelected() + 1);
    }

    function actionForArrowUp() {
        console.log("Action for Up Arrow (D-pad Up)");
        setSelected(getSelected() - 10 > 0 ? getSelected() - 10 : getSelected());
    }

    function actionForArrowDown() {
        console.log("Action for Down Arrow (D-pad Down)");
        setSelected(getSelected() + 10);
    }

    function actionForKeyA() {
        console.log("Action for Button A");
        dispatch(setEntered(getSelected()));
    }

    function actionForKeyB() {
        console.log("Action for Button B");
        if (menu) {
            dispatch(setMenu(0));
        }
    }

    function actionForKeyX() {
        console.log("Action for Button X");
    }

    function actionForKeyY() {
        console.log("Action for Button Y");
    }

    function actionForSpace() {
        console.log("Action for Left Bumper");
    }

    function actionForShift() {
        console.log("Action for Back Button");
    }

    function actionForAlt() {
        console.log("Action for Alt (Menu) Button");
        dispatch(setMenu(getSelected()));
    }

// Gamepad button mappings (buttons 0-13 as examples)
    const keyToGamepad = {
        "ArrowUp": 12,    // D-pad up
        "ArrowDown": 13,  // D-pad down
        "ArrowLeft": 14,  // D-pad left
        "ArrowRight": 15, // D-pad right
        "Enter": 0,        // Button A
        "Esc": 1,        // Button B
        "KeyX": 2,        // Button X
        "KeyY": 3,        // Button Y
        "Shift": 8,       // Back button
        "Alt": 9,         // Menu
    };

    const gamepadToKey = Object.fromEntries(Object.entries(keyToGamepad).map(([k, v]) => [v, k]));


// Function to perform the action based on key/button press
    const performAction = debounce((action) => {
        switch (action) {
            case "ArrowLeft":
                actionForArrowLeft();
                break;
            case "ArrowRight":
                actionForArrowRight();
                break;
            case "ArrowUp":
                actionForArrowUp();
                break;
            case "ArrowDown":
                actionForArrowDown();
                break;
            case "KeyA":
                actionForKeyA();
                break;
            case "KeyB":
                actionForKeyB();
                break;
            case "KeyX":
                actionForKeyX();
                break;
            case "KeyY":
                actionForKeyY();
                break;
            case "Space":
                actionForSpace();
                break;
            case "Enter":
                actionForKeyA();
                break;
            case "Shift":
                actionForShift();
                break;
            case "Alt":
                actionForAlt();
                break;
            default:
                console.log(`${action} triggered!`);
        }
    }, 100);

    // Function to check and perform the action based on gamepad input
    function checkGamepad() {
        const gamepad = navigator.getGamepads()?.find(g => g?.buttons?.length > 1);
        if (gamepad) {
            for (const [buttonIndex, key] of Object.entries(gamepadToKey)) {
                // gamepad.buttons.forEach((button, buttonIndex) => {
                if (gamepad.buttons[buttonIndex].pressed) {
                    if (!pressedButtons.has(buttonIndex)) {
                        pressedButtons.add(buttonIndex);
                        console.log(`Button ${buttonIndex} pressed`);
                        performAction(key);
                    }
                } else {
                    pressedButtons.delete(buttonIndex);
                }
            }
        }


        requestAnimationFrame(checkGamepad); // Keep polling
    }

    function keyPressHandler(event) {
        performAction(event.key); // Perform action for the corresponding key
    }
}


// function gamepadHandler() {
//     gamepad = navigator.getGamepads().find(g => g?.buttons?.length > 1);
//     if (gamepad) {
//         // Joystick movements
//         const leftStickX = gamepad.axes[0]; // Left stick X axis
//         const leftStickY = gamepad.axes[1]; // Left stick Y axis
//         const rightStickX = gamepad.axes[2]; // Right stick X axis
//         const rightStickY = gamepad.axes[3]; // Right stick Y axis
//
//         // Buttons (example for button A)
//         const buttonA = gamepad.buttons[0].pressed; // Button A is at index 0
//         const buttonB = gamepad.buttons[1].pressed; // Button B is at index 0
//         const buttonUp = gamepad.buttons[10].pressed;
//         const buttonDown = gamepad.buttons[11].pressed;
//         const buttonLeft = gamepad.buttons[12].pressed;
//         const buttonRight = gamepad.buttons[13].pressed;
//
//         requestAnimationFrame(gamepadHandler); // Keep polling
//     }
// }
//
// if ("getGamepads" in navigator) {
//     gamepadHandler(); // Start polling
// } else {
//     console.log("Gamepad API not supported.");
// }
//
// const handleHomeMenu = (event) => {
//     switch (event.key) {
//         case "ArrowRight" || gamepad?.buttons[13]?.pressed:
//             setSelected(selected + 1 < 25 ? selected + 1 : selected));
//             break;
//         case "ArrowLeft" || gamepad?.buttons[12]?.pressed:
//             setSelected(selected - 1 > 0 ? selected - 1 : selected));
//             break;
//         case "ArrowDown" || gamepad?.buttons[11]?.pressed:
//             setSelected(selected + 10 < 30 ? selected + 10 : selected));
//             break;
//         case "ArrowUp" || gamepad?.buttons[10]?.pressed:
//             setSelected(selected - 10 > 0 ? selected - 10 : selected));
//             break;
//         case "Enter" || gamepad?.buttons[7]?.pressed:
//             setMenuOpen(true);
//             break;
//         default:
//             return;
//     }
// };