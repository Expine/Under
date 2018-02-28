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

    /**
     * Set stage
     * @param {Stage} stage
     */
    setStage(stage) {
        this.stage = stage;
    }

    /**
     * Move position relatively
     * @param {number} x
     * @param {number} y
     */
    deltaMove(x, y) {
        this.x += x;
        this.y += y;
        if (this.collider !== undefined) {
            let col = false;
            for (let it of this.stage) {
                if (it.collider !== undefined && this.collider.isCollisionRoughly(it.collider) && it !== this) {
                    if (this.collider.isCollision(it.collider)) {
                        this.collider.collisionResponse(it.collider, x, y);
                        col = true;
                    }
                }
            }
            if (col) {
                this.body.repulsion();
            }
        }
    }

    /**
     * Update entty
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {
        if (this.body !== undefined) {
            this.body.update(dt);
        }
    }
}
