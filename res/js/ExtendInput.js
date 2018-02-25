/**
 * Extended input system
 * Extend yes, no, sub key system
 * @classdesc Extended input system including yes and no and sub key
 * @extends DefaultInput
 */
class ExtendInput extends DefaultInput {
    /**
     * Constructor for extended input
     * @constructor
     */
    constructor() {
        super();

        /**
         * Keycode of extended key
         * @enum {number}
         */
        this.K = {
            YES: 90,
            NO: 88,
            SUB: 67,
            ENTER: 13,
            ESC: 27
        };

        /**
         * Key code of arrow key
         * @const
         * @enum {number}
         */
        this.ARROW = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };
    }


    /**
     * Judge whether Yes key pressed now
     * @return whether Yes key pressed now
     */
    isYesPress() {
        return this.isKeyPress(this.K.YES) || this.isKeyPress(this.K.ENTER);
    }

    /**
     * Judge whether Yes key pressed
     * @return whether Yes key pressed
     */
    isYesPressed() {
        return this.isKeyPressed(this.K.YES) || this.isKeyPressed(this.K.ENTER);
    }

    /**
     * Judge whether No key pressed now
     * @return whether No key pressed now
     */
    isNoPress() {
        return this.isKeyPress(this.K.NO) || this.isKeyPress(this.K.ESC);
    }

    /**
     * Judge whether No key pressed
     * @return whether No key pressed
     */
    isNoPressed() {
        return this.isKeyPressed(this.K.NO) || this.isKeyPressed(this.K.ESC);
    }

    /**
     * Judge whether sub key pressed now
     * @return whether sub key pressed now
     */
    isSubPress() {
        return this.isKeyPress(this.K.SUB);
    }

    /**
     * Judge whether sub key pressed
     * @return whether sub key pressed
     */
    isSubPressed() {
        return this.isKeyPressed(this.K.SUB);
    }

    /**
     * Judge whether up key pressed now
     * @return whether up key pressed now
     */
    isUpPress() {
        return this.isKeyPress(this.ARROW.UP);
    }

    /**
     * Judge whether up key pressed
     * @return whether up key pressed
     */
    isUpPressed() {
        return this.isKeyPressed(this.ARROW.UP);
    }

    /**
     * Judge whether down key pressed now
     * @return whether down key pressed now
     */
    isDownPress() {
        return this.isKeyPress(this.ARROW.DOWN);
    }

    /**
     * Judge whether down key pressed
     * @return whether down key pressed
     */
    isDownPressed() {
        return this.isKeyPressed(this.ARROW.DOWN);
    }

    /**
     * Judge whether left key pressed now
     * @return whether left key pressed now
     */
    isLeftPress() {
        return this.isKeyPress(this.ARROW.LEFT);
    }

    /**
     * Judge whether left key pressed
     * @return whether left key pressed
     */
    isLeftPressed() {
        return this.isKeyPressed(this.ARROW.LEFT);
    }

    /**
     * Judge whether right key pressed now
     * @return whether right key pressed now
     */
    isRightPress() {
        return this.isKeyPress(this.ARROW.RIGHT);
    }

    /**
     * Judge whether right key pressed
     * @return whether right key pressed
     */
    isRightPressed() {
        return this.isKeyPressed(this.ARROW.RIGHT);
    }
}