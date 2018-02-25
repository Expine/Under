/**
 * Input system
 * Manage input event including mouse and key
 * @classdesc Input system for managing input event
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setInput(new DefaultInput());
 */
class Input {
    /**
     * Set input target
     * Set mouse and key event
     * @param {Element} target - input target
     */
    setTarget(target) {
        /**
         * Input target
         * For example, div, document
         * @protected
         * @type {Element}
         */
        this.target = target;

        // mouse
        target.onmousemove = e => {
            this.onMouseMove(e);
        };
        target.onmousedown = e => {
            this.onMouseDown(e);
        }
        target.onmouseup = e => {
            this.onMouseUp(e);
        }

        // key
        target.parentElement.onkeydown = e => {
            this.onKeyDown(e);
        }
        target.parentElement.onkeyup = e => {
            this.onKeyUp(e);
        }

        // clear
        target.parentElement.onblur = () => {
            this.clear();
        }
    }

    /**
     * Set screen instance for getting screen ratio
     * @param {Screen} screen
     */
    setScreen(screen) {
        /**
         * Screen instance for getting screen ratio
         * @protected
         * @type {Screen}
         */
        this.screen = screen;
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