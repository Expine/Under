/**
 * Possessed object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Owned by someone
 * - ### Generated and owned by someone
 * @extends {AIListedObject}
 * @classdesc Possessed object that is generated and owned by someone
 */
class PossessedObject extends AIListedObject /* , IOwned */ { // eslint-disable-line  no-unused-vars
    /**
     * Possessed object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.owner = null;
    }

    /**
     * Set owned entity
     * @override
     * @param {Entity} owner Owned entity
     */
    setOwner(owner) {
        this.owner = owner;
    }

    /**
     * Get owned entity
     * @override
     * @return {Entity} Owned entity
     */
    getOwner() {
        return this.owner;
    }
}
