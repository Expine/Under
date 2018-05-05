/**
 * Mouse input
 * - Manages input event
 * - It can get input state
 * - It can make input blocked
 * - Registers input state by input event
 * - Get mouse code
 * - Get mouse position
 * - ### Manages mouse input event and register state
 * @extends {StateInputManager}
 * @classdesc Mouse input to manage mouse input event and register state
 */
class MouseInput extends StateInputManager /* , IMouse */ { // eslint-disable-line  no-unused-vars
    /**
     * Mouse input constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Mouse x position
         * @protected
         * @type {number}
         */
        this.mouseX = 0;
        /**
         * Mouse y position
         * @protected
         * @type {number}
         */
        this.mouseY = 0;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        super.init();
        // initialize key state
        for (let i = 0; i < 3; ++i) {
            this.inputState.push(this.STATE.NONE);
        }

        // mouse
        this.target.onmousemove = (e) => {
            this.onMouseMove(e);
        };
        this.target.onmousedown = (e) => {
            this.onMouseDown(e);
        };
        this.target.onmouseup = (e) => {
            this.onMouseUp(e);
        };

        // clear
        let blur = this.target.parentElement.onblur;
        this.target.parentElement.onblur = () => {
            this.clear();
            if (blur !== undefined) {
                blur();
            }
        };

        // ban context menu
        document.oncontextmenu = function() {
            return false;
        };
    }

    /**
     * Get mouse right code
     * @override
     * @return {number} Mouse right code
     */
    mRight() {
        return 2;
    }
    /**
     * Get mouse left code
     * @override
     * @return {number} Mouse left code
     */
    mLeft() {
        return 0;
    }
    /**
     * Get mouse center code
     * @override
     * @return {number} Mouse center code
     */
    mCenter() {
        return 1;
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseX() {
        return this.mouseX;
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseY() {
        return this.mouseY;
    }

    /**
     * Mouse move function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    onMouseMove(e) {
        const rect = this.target.getBoundingClientRect();
        this.mouseX = (e.clientX - rect.left) / this.screen.gameSize;
        this.mouseY = (e.clientY - rect.top) / this.screen.gameSize;
    }

    /**
     * Mouse down function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    onMouseDown(e) {
        if (!this.enable) {
            return;
        }
        let button = e.button;
        if (this.inputState[button] === undefined || this.inputState[button] == this.STATE.NONE) {
            this.inputState[button] = this.STATE.PRESS;
        }
    }

    /**
     * Mouse up function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    onMouseUp(e) {
        if (!this.enable) {
            return;
        }
        let button = e.button;
        this.inputState[button] = this.STATE.NONE;
    }
}
