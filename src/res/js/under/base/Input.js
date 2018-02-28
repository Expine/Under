/**
 * Input system
 * Manages input event including mouse and key
 * Manages input state and provide input state
 * @classdesc Input system for managing input event
 */
class Input { // eslint-disable-line  no-unused-vars
    /**
     * Set screen instance for getting screen ratio and setting inut target
     * @param {Screen} screen
     */
    setScreen(screen) {
        /**
         * Screen instance for getting screen ratio
         * @protected
         * @type {Screen}
         */
        this.screen = screen;

        /**
         * Input target
         * For example, div, document
         * @protected
         * @type {Element}
         */
        this.target = this.screen.getTarget();

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

        // key
        this.target.parentElement.onkeydown = (e) => {
            this.onKeyDown(e);
        };
        this.target.parentElement.onkeyup = (e) => {
            this.onKeyUp(e);
        };

        // clear
        this.target.parentElement.onblur = () => {
            this.clear();
        };
    }

    /**
     * Update input state
     * @interface
     */
    update() {}

    /**
     * Mouse move function
     * @interface
     * @param {MouseEvent} e - mouse event
     */
    onMouseMove(e) {}

    /**
     * Mouse down function
     * @interface
     * @param {MouseEvent} e - mouse event
     */
    onMouseDown(e) {}

    /**
     * Mouse up function
     * @interface
     * @param {MouseEvent} e - mouse event
     */
    onMouseUp(e) {}

    /**
     * Key down function
     * @interface
     * @param {KeyEvent} e - key event
     */
    onKeyDown(e) {}

    /**
     * Key up function
     * @interface
     * @param {KeyEvent} e - key event
     */
    onKeyUp(e) {}

    /**
     * Clear key and mouse state
     * @interface
     */
    clear() {}

    /**
     * Get mouse x position
     * @interface
     * @return mouse x position
     */
    getMouseX() {}

    /**
     * Get mouse x position
     * @interface
     * @return mouse x position
     */
    getMouseY() {}

    /**
     * Judge whether mouse pressed now
     * @interface
     * @param {number} code - target mouse code
     * @return whether mouse pressed now
     */
    isMousePress(code) {}

    /**
     * Judge whether mouse pressed
     * @interface
     * @param {number} code - target mouse code
     * @return whether mouse pressed
     */
    isMousePressed(code) {}

    /**
     * Judge whether key pressed now
     * @interface
     * @param {number} code - target key code
     * @return whether key pressed now
     */
    isKeyPress(code) {}

    /**
     * Judge whether key pressed
     * @interface
     * @param {number} code - target key code
     * @return whether key pressed
     */
    isKeyPressed(code) {}
}
