/**
 * Prevent key input
 * - Manages input event
 * - It can get input state
 * - It can make input blocked
 * - Registers input state by input event
 * - Get key code
 * - ### Prevents default key function
 * @extends {KeyInput}
 * @classdesc Prevent key input to prevent default key function
 */
class PreventKeyInput extends KeyInput { // eslint-disable-line  no-unused-vars
    /**
     * Prevent key event if it's key code is used
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    prevent(e) {
        const code = e.keyCode;
        if (code === this.up() || code === this.down() || code === this.right() || code === this.left() || code === this.yes() || code === this.no() || code === this.sub()) {
            e.preventDefault();
        }
    }
    /**
     * Prevent key down function
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    onKeyDown(e) {
        this.prevent(e);
        super.onKeyDown(e);
    }

    /**
     * Key up function
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    onKeyUp(e) {
        this.prevent(e);
        super.onKeyUp(e);
    }
}
