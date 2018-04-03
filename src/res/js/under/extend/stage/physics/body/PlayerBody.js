/**
 * Player body
 * Adopt the maximum for adding to the next speed
 * @extends {MaxAdoptBody}
 * @classdesc Body to ddopt the maximum for adding to the next speed
 */
class PlayerBody extends MaxAdoptBody { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @constructor
     */
    constructor() {
        super();

        this.k = 10;
    }
}
