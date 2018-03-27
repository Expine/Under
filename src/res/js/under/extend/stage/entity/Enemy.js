/**
 * Enemy object
 * Entities operated by the enemy
 * @implements {Character}
 * @classdesc Enemy object to operate by input
 */
class Enemy extends Character { // eslint-disable-line  no-unused-vars
    /**
     * Enemy constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering
     */
    constructor(x, y, width, height, imageID) {
        super(x, y, width, height, imageID);

        // initialize
        this.hp = 1;
        this.directionX = 1;
    }
}
