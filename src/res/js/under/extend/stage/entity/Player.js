/**
 * Player object
 * Entities operated by the player
 * @implements {AIListedObject}
 * @classdesc Player object to operate by input
 */
class Player extends AIListedObject { // eslint-disable-line  no-unused-vars

    /**
     * Player constructor
     * @constructor
     * @param {Input} input input system for getting player operation
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering (if has not, -1)
     */
    constructor(input, x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

        this.addAI(new PlayerAI(this, input));
    }
}
