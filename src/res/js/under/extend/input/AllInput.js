/**
 * All input
 * - Manages input event
 * - Get key code
 * - Get mouse code
 * - Get mouse position
 * - ### Manages all input and delegate it
 * @implements {Input}
 * @classdesc All input to manage all input and delegate it
 */
class AllInput extends Input /* , IKey, IMouse */ { // eslint-disable-line  no-unused-vars
    /**
     * All input constructor
     * @constructor
     * @param {IKey} key Key instance for input
     * @param {IMouse} mouse Mouse instance for input
     */
    constructor(key, mouse) {
        super();

        /**
         * Key instance for delegation
         * @protected
         * @type {IKey}
         */
        this.keyDelegate = key;
        /**
         * Mouse instance for delegation
         * @protected
         * @type {IMouse}
         */
        this.mouseDelegate = mouse;

        /**
         * Mouse base code number
         * @protected
         * @const
         * @type {number}
         */
        this.mousBaseCode = 1000;
    }

    /**
     * Set screen instance for getting screen ratio and setting inut target
     * @override
     * @param {Screen} screen
     */
    setScreen(screen) {
        super.setScreen(screen);
        if (this.keyDelegate instanceof Input) {
            this.keyDelegate.setScreen(screen);
        }
        if (this.mouseDelegate instanceof Input) {
            this.mouseDelegate.setScreen(screen);
        }
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        if (this.keyDelegate instanceof Input) {
            this.keyDelegate.init();
        }
        if (this.mouseDelegate instanceof Input) {
            this.mouseDelegate.init();
        }
    }

    /**
     * Update input
     * @override
     */
    update() {
        if (this.keyDelegate instanceof Input) {
            this.keyDelegate.update();
        }
        if (this.mouseDelegate instanceof Input) {
            this.mouseDelegate.update();
        }
    }

    /**
     * Clear input state
     * @override
     * @protected
     */
    clear() {
        if (this.keyDelegate instanceof Input) {
            this.keyDelegate.clear();
        }
        if (this.mouseDelegate instanceof Input) {
            this.mouseDelegate.clear();
        }
    }

    /**
     * Get A key code
     * @override
     * @return {number} A key code
     */
    a() {
        return this.keyDelegate.a();
    }
    /**
     * Get 0 key code
     * @override
     * @return {number} 0 key code
     */
    zero() {
        return this.keyDelegate.zero();
    }

    /**
     * Get right key code
     * @override
     * @return {number} Right key code
     */
    right() {
        return this.keyDelegate.right();
    }
    /**
     * Get left key code
     * @override
     * @return {number} Left key code
     */
    left() {
        return this.keyDelegate.left();
    }
    /**
     * Get up key code
     * @override
     * @return {number} Up key code
     */
    up() {
        return this.keyDelegate.up();
    }
    /**
     * Get down key code
     * @override
     * @return {number} Down key code
     */
    down() {
        return this.keyDelegate.down();
    }

    /**
     * Get yes key code
     * @override
     * @return {number} Yes key code
     */
    yes() {
        return this.keyDelegate.yes();
    }
    /**
     * Get no key code
     * @override
     * @return {number} No key code
     */
    no() {
        return this.keyDelegate.no();
    }
    /**
     * Get sub key code
     * @override
     * @return {number} Sub key code
     */
    sub() {
        return this.keyDelegate.sub();
    }

    /**
     * Get mouse right code
     * @override
     * @return {number} Mouse right code
     */
    mRight() {
        return this.mouseDelegate.mRight() + this.mousBaseCode;
    }
    /**
     * Get mouse left code
     * @override
     * @return {number} Mouse left code
     */
    mLeft() {
        return this.mouseDelegate.mLeft() + this.mousBaseCode;
    }
    /**
     * Get mouse center code
     * @override
     * @return {number} Mouse center code
     */
    mCenter() {
        return this.mouseDelegate.mCenter() + this.mousBaseCode;
    }

    /**
     * Get mouse x position
     * @interface
     * @return mouse x position
     */
    getMouseX() {
        return this.mouseDelegate.getMouseX();
    }

    /**
     * Get mouse x position
     * @interface
     * @return mouse x position
     */
    getMouseY() {
        return this.mouseDelegate.getMouseY();
    }

    /**
     * Block input
     * @interface
     * @param {number} code Target code
     */
    blockInput(code) {
        if (code >= this.mousBaseCode) {
            this.mouseDelegate.blockInput(code - this.mousBaseCode);
        } else {
            this.keyDelegate.blockInput(code);
        }
    }

    /**
     * Judge whether pressed now
     * @interface
     * @param {number} code Target code
     * @return {bool} whether pressed now
     */
    isPress(code) {
        if (code >= this.mousBaseCode) {
            return this.mouseDelegate.isPress(code - this.mousBaseCode);
        } else {
            return this.keyDelegate.isPress(code);
        }
    }

    /**
     * Judge whether pressed
     * @interface
     * @param {number} code Target code
     * @return {bool} whether pressed
     */
    isPressed(code) {
        if (code >= this.mousBaseCode) {
            return this.mouseDelegate.isPressed(code - this.mousBaseCode);
        } else {
            return this.keyDelegate.isPressed(code);
        }
    }
}
