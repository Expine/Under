/**
 * Key input
 * - Manages input event
 * - It can get input state
 * - It can make input blocked
 * - Registers input state by input event
 * - Get key code
 * - ### Manages key input event and register state
 * @extends {StateInputManager}
 * @implements {IKey}
 * @classdesc Key input to manage key input event and register state
 */
class KeyInput extends StateInputManager /* , IKey */ { // eslint-disable-line  no-unused-vars
    /**
     * Get A key code
     * @override
     * @return {number} A key code
     */
    a() {
        return 65;
    }
    /**
     * Get 0 key code
     * @override
     * @return {number} 0 key code
     */
    zero() {
        return 48;
    }
    /**
     * Get space key code
     * @override
     * @return {number} Space key code
     */
    space() {
        return 13;
    }

    /**
     * Get right key code
     * @override
     * @return {number} Right key code
     */
    right() {
        return 39;
    }
    /**
     * Get left key code
     * @override
     * @return {number} Left key code
     */
    left() {
        return 37;
    }
    /**
     * Get up key code
     * @override
     * @return {number} Up key code
     */
    up() {
        return 38;
    }
    /**
     * Get down key code
     * @override
     * @return {number} Down key code
     */
    down() {
        return 40;
    }

    /**
     * Get yes key code
     * @override
     * @return {number} Yes key code
     */
    yes() {
        return 90;
    }
    /**
     * Get no key code
     * @override
     * @return {number} No key code
     */
    no() {
        return 88;
    }
    /**
     * Get sub key code
     * @override
     * @return {number} Sub key code
     */
    sub() {
        return 67;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        super.init();
        // initialize key state
        for (let i = 0; i < 255; ++i) {
            this.inputState.push(this.STATE.NONE);
        }

        // key
        this.target.parentElement.onkeydown = (e) => {
            this.onKeyDown(e);
        };
        this.target.parentElement.onkeyup = (e) => {
            this.onKeyUp(e);
        };

        // clear
        const blur = this.target.parentElement.onblur;
        this.target.parentElement.onblur = () => {
            this.clear();
            if (blur !== undefined && blur !== null) {
                blur();
            }
        };
    }

    /**
     * Key down function
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    onKeyDown(e) {
        if (!this.enable) {
            return;
        }
        const code = e.keyCode;
        if (this.inputState[code] === undefined || this.inputState[code] === this.STATE.NONE) {
            this.inputState[code] = this.STATE.PRESS;
        }
    }

    /**
     * Key up function
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    onKeyUp(e) {
        if (!this.enable) {
            return;
        }
        const code = e.keyCode;
        this.inputState[code] = this.STATE.NONE;
    }
}
