/**
 * Possessed object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - ### Generated and owned by someone
 * @implements {AIListedObject}
 * @classdesc Possessed object that is generated and owned by someone
 */
class PossessedObject extends AIListedObject { // eslint-disable-line  no-unused-vars
    /**
     * Possessed object constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {Entity} owner Owned entity
     * @param {number} [imageID=-1] Image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, owner, imageID = -1) {
        super(x, y, width, height, imageID);

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.owner = owner;
    }
}
