/**
 * Rigid body
 * @classdesc Physics item for rigid body
 */
class RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Update by rigid body
     * @interface
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Get x difference of movement
     * @interface
     * @return {number} X difference of movement
     */
    getShiftX() {}

    /**
     * Get y difference of movement
     * @interface
     * @return {number} Y difference of movement
     */
    getShiftY() {}

    /**
     * Apply force to objects
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {}

    /**
     * Repulsion for reversing velocity
     * @interface
     * @param {number} rx X component of the reference vector
     * @param {number} ry Y component of the reference vector
     */
    repulsion(rx, ry) {}
}
