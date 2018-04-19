/**
 * String interface
 * - ### It can add or remove rigid body
 * @classdesc String interface that can add or remove rigid body
 */
class IString extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get string length
     * @interface
     * @return {number} String length
     */
    getLength() {}

    /**
     * Add entity for string
     * @interface
     * @param {RigidBody} jointing Jointing body
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     */
    addBody(jointing, jointingX, jointingY, length) {}

    /**
     * Remove body from string
     * @interface
     * @param {RigidBody} body Joiting body
     */
    removeBody(body) {}

    /**
     * Get collision data by each string element
     * @interface
     * @return {Array<CollisionData>} collision data by each string element
     */
    getCollisions() {}
}
