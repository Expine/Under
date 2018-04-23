/**
 * Collision response
 * Performs collision response
 * @interface
 * @classdesc Collision response to performs collision response
 */
class CollisionResponse { // eslint-disable-line  no-unused-vars
    /**
     * Perform collision response
     * @abstract
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {}
}
