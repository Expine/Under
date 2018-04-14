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
     */
    addBody(jointing) {}

    /**
     * Remove body from string
     * @interface
     * @param {RigidBody} body Joiting body
     */
    removeBody(body) {}
}
