/**
 * Input class
 * @classdesc Manage input event
 */
class Input {
    /**
     * Constructor for input
     * @constructor
     * @param {Element} target - input target
     */
    constructor(target) {
        // set enum
        // input state
        this.STATE = {
            NONE: 0,
            PRESS: 1,
            PRESSED: 2,
            ON: 3
        };
        // mouse button
        this.M = {
            LEFT: 0,
            CENTER: 1,
            RIGHT: 2
        };
        // key code
        this.K = {
            YES: 90,
            NO: 88,
            SUB: 67
        };

        // mouse
        this.inputMouse = new Array(255);
        target.onmousemove = e => {
            const rect = target.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        };
        target.onmousedown = e => {
            if (this.inputMouse[e.button] === undefined || this.inputMouse[e.button] == this.STATE.NONE)
                this.inputMouse[e.button] = this.STATE.PRESS;
        };
        target.onmouseup = e => {
            this.inputMouse[e.button] = this.STATE.NONE;
        };

        // key
        this.inputKey = new Array(255);
        target.parentElement.onkeydown = e => {
            let code = e.keyCode;
            console.log("Code: " + code + ", " + this.inputKey[code]);
            if (this.inputKey[code] === undefined || this.inputKey[code] == this.STATE.NONE) {
                this.inputKey[code] = this.STATE.PRESS;
            }
            console.log("Code: " + code + ", " + this.inputKey[code]);
        };
        target.parentElement.onkeyup = e => {
            let code = e.keyCode;
            this.inputKey[code] = this.STATE.NONE;
        };

        // clear
        target.parentElement.onblur = () => {
            for (let i = 0; i < this.inputMouse.length; ++i)
                this.inputMouse[i] = this.STATE.NONE;
            for (let i = 0; i < this.inputKey.length; ++i)
                this.inputKey[i] = this.STATE.NONE;
        }
    }

    /**
     * Update input state
     */
    update() {
        // update mouse state
        for (let i = 0; i < this.inputMouse.length; ++i) {
            if (this.inputMouse[i] == this.STATE.PRESS)
                this.inputMouse[i] = this.STATE.PRESSED;
            else if (this.inputMouse[i] == this.STATE.PRESSED)
                this.inputMouse[i] = this.STATE.ON;
        }
        // update key state
        for (let i = 0; i < this.inputKey.length; ++i) {
            if (this.inputKey[i] == this.STATE.PRESS)
                this.inputKey[i] = this.STATE.PRESSED;
            else if (this.inputKey[i] == this.STATE.PRESSED)
                this.inputKey[i] = this.STATE.ON;
        }
    }

    /**
     * Judge whether key pressed now
     * @param {number} code - target key code
     * @return whether key pressed now
     */
    onKeyPress(code) {
        return this.inputKey[code] !== undefined && this.inputKey[code] == this.STATE.PRESSED
    }

    /**
     * Judge whether key pressed
     * @param {number} code - target key code
     * @return whether key pressed
     */
    onKeyPressed(code) {
        return this.inputKey[code] !== undefined && (this.inputKey[code] == this.STATE.PRESSED || this.inputKey[code] == this.STATE.ON)
    }
}