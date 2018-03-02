/**
 * Physical world for performing a physical operation
 * Receive a list of entities and apply a physical operation
 * @classdesc Physical world for performing a physical operation
 */
class PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Physical world constructor
     * @constructor
     * @param {IteratableObject<Entity>} entities Iteratable object indicating list of entity
     */
    constructor(entities) {
        /**
         * Iteratable object indicating list of entity
         * @type {IteratableObject<Entity>}
         */
        this.entities = entities;
    }

    /**
     * Update physical world
     * @param {number} dt Delta time
     * @param {Array<Entity>} targets List of targets to which physical operation is applied
     */
    update(dt, targets) {}
}
