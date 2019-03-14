import { KeyInput } from './KeyInput';
/**
 * Prevent key input
 * - Prevents default key function
 * @extends {KeyInput}
 * @classdesc Prevent key input to prevent default key function
 */
export class PreventKeyInput extends KeyInput {
    /**
     * Prevent key event if it's key code is used
     * @protected
     * @param {KeyboardEvent} e Key event
     */
    protected prevent(e: KeyboardEvent) {
        const code = e.keyCode;
        if (code === this.up() || code === this.down() || code === this.right() || code === this.left() || code === this.yes() || code === this.no() || code === this.sub()) {
            e.preventDefault();
        }
    }
    /**
     * Prevent key down function
     * @protected
     * @param {KeyboardEvent} e Key event
     */
    onKeyDown(e: KeyboardEvent) {
        this.prevent(e);
        super.onKeyDown(e);
    }

    /**
     * Key up function
     * @protected
     * @param {KeyboardEvent} e Key event
     */
    onKeyUp(e: KeyboardEvent) {
        this.prevent(e);
        super.onKeyUp(e);
    }
}
