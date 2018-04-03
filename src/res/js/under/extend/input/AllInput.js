/**
 * Input system that implements input
 * Keeps all mouse and key states
 * There is much waste, but you can respond to any key input
 * @implements {Input}
 * @classdesc Input system to keep all states
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
         * @protected
         * @type {Array<number>}
         */
        this.inputMouse = new Array(5);
        /**
         * Array for registering key input state
         * @protected
         * @type {Array<number>}
         */
        this.inputKey = new Array(255);

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
         * Whether mouse is blocked or not
         * @protected
         * @type {bool}
         */
        this.mouseBlocked = new Array(5);
        /**
         * Whether key is blocked or not
         * @protected
         * @type {bool}
         */
        this.keyBlocked = new Array(255);

        /**
         * Input state
         * @private
         * @const
         * @enum {Enum<number>}
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
         * @enum {Enum<number>}
         */
        this.M = {
            LEFT: 0,
            CENTER: 1,
            RIGHT: 2,
        };

        /**
         * Left arrow key code
         * @type {number}
         */
        this.left = 37;
        /**
         * Up arrow key code
         * @type {number}
         */
        this.up = 38;
        /**
         * Right arrow key code
         * @type {number}
         */
        this.right = 39;
        /**
         * Down arrow key code
         * @type {number}
         */
        this.down = 40;

        /**
         * Z key code
         * @type {number}
         */
        this.yes = 90;
        /**
         * X key code
         * @type {number}
         */
        this.no = 88;
        /**
         * C key code
         * @type {number}
         */
        this.sub = 67;

        // ban context menu
        document.oncontextmenu = function() {
            return false;
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
        if (this.inputMouse[button] === undefined || this.inputMouse[button] == this.STATE_.NONE) {
            this.inputMouse[button] = this.STATE_.PRESS;
        }
    }

    /**
     * Mouse up function
     * @override
     * @param {MouseEvent} e - mouse event
     */
    onMouseUp(e) {
        let button = e.button;
        this.inputMouse[button] = this.STATE_.NONE;
    }

    /**
     * Key down function
     * @override
     * @param {KeyEvent} e - key event
     */
    onKeyDown(e) {
        let code = e.keyCode;
        if (this.inputKey[code] === undefined || this.inputKey[code] == this.STATE_.NONE) {
            this.inputKey[code] = this.STATE_.PRESS;
        }
    }

    /**
     * Key up function
     * @override
     * @param {KeyEvent} e - key event
     */
    onKeyUp(e) {
        let code = e.keyCode;
        this.inputKey[code] = this.STATE_.NONE;
    }

    /**
     * Clear key and mouse state
     * @override
     */
    clear() {
        for (let i = 0; i < this.inputMouse.length; ++i) {
            this.inputMouse[i] = this.STATE_.NONE;
        }
        for (let i = 0; i < this.inputKey.length; ++i) {
            this.inputKey[i] = this.STATE_.NONE;
        }
    }

    /**
     * Update input state
     * @override
     */
    update() {
        // update mouse state
        for (let i = 0; i < this.inputMouse.length; ++i) {
            if (this.inputMouse[i] == this.STATE_.PRESS) {
                this.inputMouse[i] = this.STATE_.PRESSED;
            } else if (this.inputMouse[i] == this.STATE_.PRESSED) {
                this.inputMouse[i] = this.STATE_.ON;
            }
            this.blockMouseInput[i] = false;
        }
        // update key state
        for (let i = 0; i < this.inputKey.length; ++i) {
            if (this.inputKey[i] == this.STATE_.PRESS) {
                this.inputKey[i] = this.STATE_.PRESSED;
            } else if (this.inputKey[i] == this.STATE_.PRESSED) {
                this.inputKey[i] = this.STATE_.ON;
            }
            this.blockKeyInput[i] = false;
        }
    }

    /**
     * Block mouse input
     * @interface
     * @param {number} code Target mouse code
     */
    blockMouseInput(code) {
        this.blockMouseInput[code] = true;
    }

    /**
     * Block key input
     * @interface
     * @param {number} code Target key code
     */
    blockKeyInput(code) {
        this.blockKeyInput[code] = true;
    }

    /**
     * Judge whether mouse pressed now
     * @override
     * @param {number} code - target mouse code
     * @return whether mouse pressed now
     */
    isMousePress(code) {
        return !this.blockMouseInput[code] && this.inputMouse[code] !== undefined && this.inputMouse[code] == this.STATE_.PRESSED;
    }

    /**
     * Judge whether mouse pressed
     * @override
     * @param {number} code - target mouse code
     * @return whether mouse pressed
     */
    isMousePressed(code) {
        return !this.blockMouseInput[code] && this.inputMouse[code] !== undefined && (this.inputMouse[code] == this.STATE_.PRESSED || this.inputMouse[code] == this.STATE_.ON);
    }

    /**
     * Judge whether key pressed now
     * @override
     * @param {number} code - target key code
     * @return whether key pressed now
     */
    isKeyPress(code) {
        return !this.blockKeyInput[code] && this.inputKey[code] !== undefined && this.inputKey[code] == this.STATE_.PRESSED;
    }

    /**
     * Judge whether key pressed
     * @override
     * @param {number} code - target key code
     * @return whether key pressed
     */
    isKeyPressed(code) {
        return !this.blockKeyInput[code] && this.inputKey[code] !== undefined && (this.inputKey[code] == this.STATE_.PRESSED || this.inputKey[code] == this.STATE_.ON);
    }
}
