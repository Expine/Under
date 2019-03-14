import { StateInputManager, STATE } from './StateInputManager';
import { IKey } from './../../base/input/IKey';
/**
 * Key input
 * - Manages key input event and register state
 * @extends {StateInputManager}
 * @implements {IKey}
 * @classdesc Key input to manage key input event and register state
 */
export class KeyInput extends StateInputManager implements IKey {
    /**
     * Initialize input
     * @override
     */
    init() {
        super.init();
        // initialize key state
        for (let i = 0; i < 255; ++i) {
            this.inputState.push(STATE.NONE);
        }

        if (this.target.parentElement != null) {
            // key
            this.target.parentElement.onkeydown = (e) => {
                this.onKeyDown(e);
            };
            this.target.parentElement.onkeyup = (e) => {
                this.onKeyUp(e);
            };

            // clear
            const instance = this;
            const onblur = this.target.parentElement.onblur;
            this.target.parentElement.onblur = function (this: GlobalEventHandlers, ev: FocusEvent) {
                instance.clear();
                if (onblur !== undefined && onblur !== null) {
                    onblur.apply(this, [ev]);
                }
            };
        }
    }

    /**
     * Get A key code
     * @override
     * @return {number} A key code
     */
    a(): number {
        return 65;
    }
    /**
     * Get 0 key code
     * @override
     * @return {number} 0 key code
     */
    zero(): number {
        return 48;
    }
    /**
     * Get space key code
     * @override
     * @return {number} Space key code
     */
    space(): number {
        return 13;
    }

    /**
     * Get right key code
     * @override
     * @return {number} Right key code
     */
    right(): number {
        return 39;
    }
    /**
     * Get left key code
     * @override
     * @return {number} Left key code
     */
    left(): number {
        return 37;
    }
    /**
     * Get up key code
     * @override
     * @return {number} Up key code
     */
    up(): number {
        return 38;
    }
    /**
     * Get down key code
     * @override
     * @return {number} Down key code
     */
    down(): number {
        return 40;
    }

    /**
     * Get yes key code
     * @override
     * @return {number} Yes key code
     */
    yes(): number {
        return 90;
    }
    /**
     * Get no key code
     * @override
     * @return {number} No key code
     */
    no(): number {
        return 88;
    }
    /**
     * Get sub key code
     * @override
     * @return {number} Sub key code
     */
    sub(): number {
        return 67;
    }

    /**
     * Key down function
     * @protected
     * @param {KeyboardEvent} e Key event
     */
    onKeyDown(e: KeyboardEvent) {
        if (!this.enable) {
            return;
        }
        const code = e.keyCode;
        if (this.inputState[code] === undefined || this.inputState[code] === STATE.NONE) {
            this.inputState[code] = STATE.PRESS;
        }
    }

    /**
     * Key up function
     * @protected
     * @param {KeyboardEvent} e Key event
     */
    onKeyUp(e: KeyboardEvent) {
        if (!this.enable) {
            return;
        }
        const code = e.keyCode;
        this.inputState[code] = STATE.NONE;
    }
}
