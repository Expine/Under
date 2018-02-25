/**
 * Extended input system
 * Extend yes, no, sub key system
 * @classdesc Extended input system including yes and no and sub key
 * @prop
 */
class ExtendInput extends DefaultInput {
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
}