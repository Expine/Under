/**
 * Input system that implements input
 * Keeps all mouse and key states
 * There is much waste, but you can respond to any key input
 * @implements {Input}
 * @classdesc Input system to keep all states
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setInput(new AllInput());
 */
class AllInput extends Input { // eslint-disable-line  no-unused-vars
    /**
     * All input constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Array for registering mouse input state
         * @private
         * @type {Array}
         */
        this.inputMouse_ = new Array(5);
        /**
         * Array for registering key input state
         * @private
         * @type {Array}
         */
        this.inputKey_ = new Array(255);

        /**
         * Mouse x position
         * @private
         * @type {number}
         */
        this.mouseX_ = 0;
        /**
         * Mouse y position
         * @private
         * @type {number}
         */
        this.mouseY_ = 0;

        /**
         * Input state
         * @private
         * @const
         * @enum {number}
         */
        this.STATE_ = {
            NONE: 0,
            PRESS: 1,
            PRESSED: 2,
            ON: 3,
        };
        /**
         * Mouse button enumeration
         * @const
         * @enum {number}
         */
        this.M = {
            LEFT: 0,
            CENTER: 1,
            RIGHT: 2,
        };
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseX() {
        return this.mouseX_;
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseY() {
        return this.mouseY_;
    }

    /**
     * Mouse move function
     * @override
     * @param {MouseEvent} e - mouse event
     */
    onMouseMove(e) {
        const rect = this.target.getBoundingClientRect();
        this.mouseX_ = (e.clientX - rect.left) / this.screen.gameSize;
        this.mouseY_ = (e.clientY - rect.top) / this.screen.gameSize;
    }

    /**
     * Mouse down function
     * @override
     * @param {MouseEvent} e - mouse event
     */
    onMouseDown(e) {
        let button = e.button;
        if (this.inputMouse_[button] === undefined || this.inputMouse_[button] == this.STATE_.NONE) {
            this.inputMouse_[button] = this.STATE_.PRESS;
        }
    }

    /**
     * Mouse up function
     * @override
     * @param {MouseEvent} e - mouse event
     */
    onMouseUp(e) {
        let button = e.button;
        this.inputMouse_[button] = this.STATE_.NONE;
    }

    /**
     * Key down function
     * @override
     * @param {KeyEvent} e - key event
     */
    onKeyDown(e) {
        let code = e.keyCode;
        if (this.inputKey_[code] === undefined || this.inputKey_[code] == this.STATE_.NONE) {
            this.inputKey_[code] = this.STATE_.PRESS;
        }
    }

    /**
     * Key up function
     * @override
     * @param {KeyEvent} e - key event
     */
    onKeyUp(e) {
        let code = e.keyCode;
        this.inputKey_[code] = this.STATE_.NONE;
    }

    /**
     * Clear key and mouse state
     * @override
     */
    clear() {
        for (let i = 0; i < this.inputMouse_.length; ++i) {
            this.inputMouse_[i] = this.STATE_.NONE;
        }
        for (let i = 0; i < this.inputKey_.length; ++i) {
            this.inputKey_[i] = this.STATE_.NONE;
        }
    }

    /**
     * Update input state
     * @override
     */
    update() {
        // update mouse state
        for (let i = 0; i < this.inputMouse_.length; ++i) {
            if (this.inputMouse_[i] == this.STATE_.PRESS) {
                this.inputMouse_[i] = this.STATE_.PRESSED;
            } else if (this.inputMouse_[i] == this.STATE_.PRESSED) {
                this.inputMouse_[i] = this.STATE_.ON;
            }
        }
        // update key state
        for (let i = 0; i < this.inputKey_.length; ++i) {
            if (this.inputKey_[i] == this.STATE_.PRESS) {
                this.inputKey_[i] = this.STATE_.PRESSED;
            } else if (this.inputKey_[i] == this.STATE_.PRESSED) {
                this.inputKey_[i] = this.STATE_.ON;
            }
        }
    }

    /**
     * Judge whether mouse pressed now
     * @override
     * @param {number} code - target mouse code
     * @return whether mouse pressed now
     */
    isMousePress(code) {
        return this.inputMouse_[code] !== undefined && this.inputMouse_[code] == this.STATE_.PRESSED;
    }

    /**
     * Judge whether mouse pressed
     * @override
     * @param {number} code - target mouse code
     * @return whether mouse pressed
     */
    isMousePressed(code) {
        return this.inputMouse_[code] !== undefined && (this.inputMouse_[code] == this.STATE_.PRESSED || this.inputMouse_[code] == this.STATE_.ON);
    }

    /**
     * Judge whether key pressed now
     * @override
     * @param {number} code - target key code
     * @return whether key pressed now
     */
    isKeyPress(code) {
        return this.inputKey_[code] !== undefined && this.inputKey_[code] == this.STATE_.PRESSED;
    }

    /**
     * Judge whether key pressed
     * @override
     * @param {number} code - target key code
     * @return whether key pressed
     */
    isKeyPressed(code) {
        return this.inputKey_[code] !== undefined && (this.inputKey_[code] == this.STATE_.PRESSED || this.inputKey_[code] == this.STATE_.ON);
    }
}
