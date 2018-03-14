/**
 * Under player object
 * Entities operated by the player
 * @implements {StateCharacter}
 * @classdesc Under player object to operate by input
 */
class UnderPlayer extends Player { // eslint-disable-line  no-unused-vars
    /**
     * Under player constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering
     */
    constructor(x, y, width, height, imageID) {
        super(x, y, width, height, imageID);

        this.addAI(new BaseStateAI(this, new PUnderState()), 0);
    }
}
