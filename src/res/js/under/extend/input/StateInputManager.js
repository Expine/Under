/**
 * State input manager
 * - Manages input event
 * - It can get input state
 * - It can make input blocked
 * - ### Registers input state by input event
 * @extends {Input}
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
         * @type {Array<boolean>}
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

        /**
         * Enable for input
         * @protected
         * @type {boolean}
         */
        this.enable = true;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        this.target = this.screen.getTarget();
        this.enable = true;
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
     * Set inpt enable
     * @override
     * @param {boolean} enable Input enable
     */
    setInputEnable(enable) {
        this.enable = enable;
        this.clear();
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
     * Unblock input
     * @override
     * @param {number} code Target code
     */
    unblockInput(code) {
        this.blocked[code] = false;
    }

    /**
     * Press target code
     * @override
     * @param {number} code Target code
     */
    press(code) {
        this.inputState[code] = this.STATE.PRESSED;
    }

    /**
     * Unpress target code
     * @override
     * @param {number} code Target code
     */
    unpress(code) {
        this.inputState[code] = this.STATE.NONE;
    }

    /**
     * Judge whether pressed now
     * @override
     * @param {number} code Target code
     * @return {boolean} whether pressed now
     */
    isPress(code) {
        return !this.blocked[code] && this.inputState[code] !== undefined && this.inputState[code] == this.STATE.PRESSED;
    }

    /**
     * Judge whether pressed
     * @override
     * @param {number} code Target code
     * @return {boolean} whether pressed
     */
    isPressed(code) {
        return !this.blocked[code] && this.inputState[code] !== undefined && (this.inputState[code] == this.STATE.PRESSED || this.inputState[code] == this.STATE.ON);
    }
}
