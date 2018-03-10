/**
 * Player object
 * Entities operated by the player
 * @implements {StateCharacter}
 * @classdesc Player object to operate by input
 */
class Player extends StateCharacter { // eslint-disable-line  no-unused-vars
    /**
     * Player constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering
     */
    constructor(x, y, width, height, imageID) {
        super(x, y, width, height, imageID);

        this.addAI(new BaseStateAI(this, new PStationaryState()));

        this.hp = 5;

        /**
         * Direction of player
         */
        this.direction = 1;
    }
}
