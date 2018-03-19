/**
 * Mmutable object
 * It is not fixed and can be moved
 * @implements {Entity}
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
        body.setEntity(this);
    }

    /**
     * Move entity relatively
     * @param {number} dx Relative movement amount in x direction
     * @param {number} dy Relative movement amount in y direction
     */
    deltaMove(dx, dy) {
        this.x += dx;
        this.y += dy;
        if (this.collider !== undefined) {
            this.collider.update();
        }
    }
}
