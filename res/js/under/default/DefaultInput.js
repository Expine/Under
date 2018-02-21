/**
 * Default input example
 * @classdesc Input sample class
 */
class DefaultInput extends Input {
    /**
     * Constructor for default input
     * @constructor
     */
    constructor() {
        super();
        this.inputMouse = new Array(5);
        this.inputKey = new Array(255);

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
    }

    /**
     * Get mouse x position
     * @return mouse x position
     */
    getMouseX() {
        return this.mouseX;
    }

    /**
     * Get mouse x position
     * @return mouse x position
     */
    getMouseY() {
        return this.mouseY;
    }

    /**
     * Mouse move function
     * @param {MouseEvent} e - mouse event
     */
    onMouseMove(e) {
        const rect = this.target.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    /**
     * Mouse down function
     * @param {MouseEvent} e - mouse event
     */
    onMouseDown(e) {
        let button = e.button;
        if (this.inputMouse[button] === undefined || this.inputMouse[button] == this.STATE.NONE)
            this.inputMouse[button] = this.STATE.PRESS;
    }

    /**
     * Mouse up function
     * @param {MouseEvent} e - mouse event
     */
    onMouseUp(e) {
        let button = e.button;
        this.inputMouse[button] = this.STATE.NONE;
    }

    /**
     * Key down function
     * @param {KeyEvent} e - key event
     */
    onKeyDown(e) {
        let code = e.keyCode;
        if (this.inputKey[code] === undefined || this.inputKey[code] == this.STATE.NONE)
            this.inputKey[code] = this.STATE.PRESS;
    }

    /**
     * Key up function
     * @param {KeyEvent} e - key event
     */
    onKeyUp(e) {
        let code = e.keyCode;
        this.inputKey[code] = this.STATE.NONE;
    }

    /**
     * Clear key and mouse state
     */
    clear() {
        for (let i = 0; i < this.inputMouse.length; ++i)
            this.inputMouse[i] = this.STATE.NONE;
        for (let i = 0; i < this.inputKey.length; ++i)
            this.inputKey[i] = this.STATE.NONE;
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
     * Judge whether mouse pressed now
     * @param {number} code - target mouse code
     * @return whether mouse pressed now
     */
    isMousePress(code) {
        return this.inputMouse[code] !== undefined && this.inputMouse[code] == this.STATE.PRESSED
    }

    /**
     * Judge whether mouse pressed
     * @param {number} code - target mouse code
     * @return whether mouse pressed
     */
    isMousePressed(code) {
        return this.inputMouse[code] !== undefined && (this.inputMouse[code] == this.STATE.PRESSED || this.inputMouse[code] == this.STATE.ON)
    }

    /**
     * Judge whether key pressed now
     * @param {number} code - target key code
     * @return whether key pressed now
     */
    isKeyPress(code) {
        return this.inputKey[code] !== undefined && this.inputKey[code] == this.STATE.PRESSED
    }

    /**
     * Judge whether key pressed
     * @param {number} code - target key code
     * @return whether key pressed
     */
    isKeyPressed(code) {
        return this.inputKey[code] !== undefined && (this.inputKey[code] == this.STATE.PRESSED || this.inputKey[code] == this.STATE.ON)
    }
}