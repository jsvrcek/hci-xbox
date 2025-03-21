// gamepad.js
// Define different actions for each button/key
export function actionForArrowLeft() {
    console.log("Action for Left Arrow (D-pad Left)");
}

export function actionForArrowRight() {
    console.log("Action for Right Arrow (D-pad Right)");
}

export function actionForKeyA() {
    console.log("Action for Button A");
}

export function actionForKeyB() {
    console.log("Action for Button B");
}

export function actionForKeyX() {
    console.log("Action for Button X");
}

export function actionForKeyY() {
    console.log("Action for Button Y");
}

export function actionForSpace() {
    console.log("Action for Left Bumper");
}

export function actionForEnter() {
    console.log("Action for Right Bumper");
}

export function actionForShift() {
    console.log("Action for Back Button");
}

// Gamepad button mappings (buttons 0-13 as examples)
export const gamepadButtonMappings = {
    "ArrowLeft": 11,  // D-pad left
    "ArrowRight": 12, // D-pad right
    "ArrowUp": 10,    // D-pad up
    "ArrowDown": 13,  // D-pad down
    "KeyA": 0,        // Button A
    "KeyB": 1,        // Button B
    "KeyX": 2,        // Button X
    "KeyY": 3,        // Button Y
    "Space": 4,       // Left bumper
    "Enter": 5,       // Right bumper
    "Shift": 6,       // Back button
};

// Function to perform the action based on key/button press
export function performAction(action) {
    switch(action) {
        case "ArrowLeft":
            actionForArrowLeft();
            break;
        case "ArrowRight":
            actionForArrowRight();
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
            actionForEnter();
            break;
        case "Shift":
            actionForShift();
            break;
        default:
            console.log(`${action} triggered!`);
    }
}

// Function to check and perform the action based on gamepad input
export function checkGamepad() {
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
        const gamepad = gamepads[0];

        // Check if any mapped gamepad button is pressed
        for (const key in gamepadButtonMappings) {
            const buttonIndex = gamepadButtonMappings[key];
            if (gamepad.buttons[buttonIndex] && gamepad.buttons[buttonIndex].pressed) {
                performAction(key); // Perform action for the corresponding key/button
            }
        }
    }
    requestAnimationFrame(checkGamepad); // Keep polling
}

// Key press handler
export function keyPressHandler(event) {
    const key = event.key; // Get the pressed key

    // If the key corresponds to a mapped gamepad button
    if (gamepadButtonMappings[key] !== undefined) {
        performAction(key); // Perform action for the corresponding key
    }
}
