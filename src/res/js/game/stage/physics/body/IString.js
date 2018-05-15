/**
 * String interface
 * - ### It can add or remove rigid body
 * @interface
 * @classdesc String interface that can add or remove rigid body
 */
class IString extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get string length
     * @abstract
     * @return {number} String length
     */
    getLength() {}

    /**
     * Add entity for string
     * @abstract
     * @param {RigidBody} jointing Jointing body
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     */
    addBody(jointing, jointingX, jointingY, length) {}

    /**
     * Remove body from string
     * @abstract
     * @param {RigidBody} body Joiting body
     */
    removeBody(body) {}
}
