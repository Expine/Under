/**
 * State input manager
 * - Manages input event
 * - ### Registers input state by input event
 * @implements {Input}
 * @classdesc State input manager to regiter input state by input event
 */
class StateInputManager extends Input /* , IInput */ { // eslint-disable-line  no-unused-vars
    /**
     * State input manager constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Array for registering input state
         * @protected
         * @type {Array<number>}
         */
        this.inputState = [];

        /**
         * Whether input is blocked or not
         * @protected
         * @type {Array<bool>}
         */
        this.blocked = [];

        /**
         * Input state
         * @protected
         * @const
         * @enum {Enum<number>}
         */
        this.STATE = {
            NONE: 0,
            PRESS: 1,
            PRESSED: 2,
            ON: 3,
        };

        /**
         * Input target
         * For example, div, document
         * @protected
         * @type {Element}
         */
        this.target = null;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        this.target = this.screen.getTarget();
    }

    /**
     * Update input state
     * @override
     */
    update() {
        // update input state
        for (let i = 0; i < this.inputState.length; ++i) {
            if (this.inputState[i] == this.STATE.PRESS) {
                this.inputState[i] = this.STATE.PRESSED;
            } else if (this.inputState[i] == this.STATE.PRESSED) {
                this.inputState[i] = this.STATE.ON;
            }
            this.blocked[i] = false;
        }
    }

    /**
     * Clear input state
     * @override
     */
    clear() {
        for (let i = 0; i < this.inputState.length; ++i) {
            this.inputState[i] = this.STATE.NONE;
        }
    }

    /**
     * Block input
     * @iverride
     * @param {number} code Target code
     */
    blockInput(code) {
        this.blocked[code] = true;
    }

    /**
     * Judge whether pressed now
     * @interface
     * @param {number} code Target code
     * @return {bool} whether pressed now
     */
    isPress(code) {
        return !this.blocked[code] && this.inputState[code] !== undefined && this.inputState[code] == this.STATE.PRESSED;
    }

    /**
     * Judge whether pressed
     * @interface
     * @param {number} code Target code
     * @return {bool} whether pressed
     */
    isPressed(code) {
        return !this.blocked[code] && this.inputState[code] !== undefined && (this.inputState[code] == this.STATE.PRESSED || this.inputState[code] == this.STATE.ON);
    }
}
