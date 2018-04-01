/**
 * Under playable interface
 * Under player function interface
 * @implements {Playable}
 * @classdesc Under playable interface for under player function
 */
class UnderPlayable extends Playable { // eslint-disable-line  no-unused-vars
    /**
     * Under playable constructor
     * @constructor
     */
    constructor() {
        super();

        this.addMethod(this.getCameraX);
        this.addMethod(this.getCameraY);
    }

    /**
     * Change working AI
     * @interface
     * @param {number} id Terrain ID for changing player type
     * @return {bool} Whther player is changed or not
     */
    changeType(id) {}
}
