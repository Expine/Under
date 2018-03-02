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
     * Repulsion for reversing velocity
     * @interface
     * @param {number} rx X component of the reference vector
     * @param {number} ry Y component of the reference vector
     */
    repulsion(rx, ry) {}
}
