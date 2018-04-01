/**
 * Possessed object
 * Generated and owned by someone
 * @implements {SingleAIObject}
 * @classdesc Possessed object that is generated and owned by someone
 */
class PossessedObject extends SingleAIObject { // eslint-disable-line  no-unused-vars
    /**
     * Possessed object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {Entity} entity Attacker entity
     * @param {number} [imageID=-1] image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, entity, imageID = -1) {
        super(x, y, width, height, imageID);

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.entity = entity;
    }
}
