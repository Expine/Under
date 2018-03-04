/**
 * Physical world for performing a physical operation
 * Receive a list of entities and apply a physical operation
 * @classdesc Physical world for performing a physical operation
 */
class PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Physical world constructor
     * @constructor
     * @param {number} gravity gravity of the world
     */
    constructor(gravity) {
        /**
         * Gravity power
         * @type {number}
         */
        this.gravity = gravity * 30;
    }

    /**
     * Update physical world
     * @param {number} dt Delta time
     * @param {IteratableObject<Entity>} targets List of targets to which physical operation is applied
     * @param {IteratableObject<Entity>} entities List of all entity
     */
    update(dt, targets, entities) {}
}
