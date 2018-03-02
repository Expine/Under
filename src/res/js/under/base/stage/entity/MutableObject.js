/**
 * Mmutable object
 * It is not fixed and can be moved
 * @classdesc Mmutable map object
 */
class MutableObject extends Entity { // eslint-disable-line  no-unused-vars
    /**
     * Set rigid body
     * @param {RigidBody} body rigid body
     */
    setRigidBody(body) {
        /**
         * Entity body
         * @type {RigidBody}
         */
        this.body = body;
    }
}
