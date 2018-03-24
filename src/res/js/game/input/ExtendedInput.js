/**
 * Extended input system
 * Extend yes, no, sub key system
 * @classdesc Extended input system including yes and no and sub key
 * @extends AllInput
 */
class ExtendedInput extends AllInput { // eslint-disable-line  no-unused-vars
    /**
     * Extended input constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Key code to be regarded as Yes
         * @protected
         * @type {number}
         */
        this.Subyes = 13;
        /**
         * Key code to be regarded as No
         * @protected
         * @type {number}
         */
        this.Subno = 27;
    }

    /**
     * Judge whether any key pressed now
     * @return {bool} whether any key pressed now
     */
    isAnyKeyPress() {
        for (let i = 0; i < this.inputKey.length; i++) {
            if (this.isKeyPress(i)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Judge whether any key pressed
     * @return {bool} whether any key pressed
     */
    isAnyKeyPressed() {
        for (let i = 0; i < this.inputKey.length; i++) {
            if (this.isKeyPressed(i)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Judge whether key pressed now
     * @override
     * @param {number} code - target key code
     * @return whether key pressed now
     */
    isKeyPress(code) {
        if (code == this.yes) {
            return super.isKeyPress(code) || super.isKeyPress(this.Subyes);
        } else if (code == this.no) {
            return super.isKeyPress(code) || super.isKeyPress(this.Subno);
        } else {
            return super.isKeyPress(code);
        }
    }

    /**
     * Judge whether key pressed
     * @override
     * @param {number} code - target key code
     * @return whether key pressed
     */
    isKeyPressed(code) {
        if (code == this.yes) {
            return super.isKeyPressed(code) || super.isKeyPressed(this.Subno);
        } else if (code == this.no) {
            return super.isKeyPressed(code) || super.isKeyPressed(this.Subno);
        } else {
            return super.isKeyPressed(code);
        }
    }
}
