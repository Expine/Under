/**
 * Enemy object
 * Entities operated by the enemy
 * @implements {SingleAIObject}
 * @classdesc Enemy object to operate by input
 */
class Enemy extends SingleAIObject { // eslint-disable-line  no-unused-vars
    /**
     * Enemy constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

        this.addAI(new StraightAI(this));

        this.hp = 1;
    }
}
