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
     * Update input state
     */
    update() {}

    /**
     * Mouse move function
     * @param {MouseEvent} e - mouse event
     */
    onMouseMove(e) {}

    /**
     * Mouse down function
     * @param {MouseEvent} e - mouse event
     */
    onMouseDown(e) {}

    /**
     * Mouse up function
     * @param {MouseEvent} e - mouse event
     */
    onMouseUp(e) {}

    /**
     * Key down function
     * @param {KeyEvent} e - key event
     */
    onKeyDown(e) {}

    /**
     * Key up function
     * @param {KeyEvent} e - key event
     */
    onKeyUp(e) {}

    /**
     * Clear key and mouse state
     */
    clear() {}

    /**
     * Get mouse x position
     * @return mouse x position
     */
    mouseX() {}

    /**
     * Get mouse x position
     * @return mouse x position
     */
    mouseY() {}

    /**
     * Judge whether mouse pressed now
     * @param {number} code - target mouse code
     * @return whether mouse pressed now
     */
    isMousePress(code) {}

    /**
     * Judge whether mouse pressed
     * @param {number} code - target mouse code
     * @return whether mouse pressed
     */
    isMousePressed(code) {}

    /**
     * Judge whether key pressed now
     * @param {number} code - target key code
     * @return whether key pressed now
     */
    isKeyPress(code) {}

    /**
     * Judge whether key pressed
     * @param {number} code - target key code
     * @return whether key pressed
     */
    isKeyPressed(code) {}
}