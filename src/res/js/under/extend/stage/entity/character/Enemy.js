/**
 * Enemy
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Enable to set animation
 * - Implements damagable and animationable
 * - ### Entity operated as the enemy
 * @implements {Character}
 * @classdesc Enemy to be operated as the enemy
 */
class Enemy extends Character { // eslint-disable-line  no-unused-vars
    /**
     * Enemy constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {number} imageID Image ID for rendering
     */
    constructor(x, y, width, height, imageID) {
        super(x, y, width, height, 1, imageID);

        // initialize
        this.directionX = 1;
    }
}
