/**
 * Mmutable entity
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - ### It is not fixed and can be moved
 * @extends {InfluentialEntity}
 * @classdesc Mmutable entity that is not fixed and can be moved
 */
class MutableEntity extends InfluentialEntity { // eslint-disable-line  no-unused-vars
    /**
     * Mutable entity constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Entity body
         * @type {RigidBody}
         */
        this.body = null;

        /**
         * X direction of entity
         * @type {number}
         */
        this.directionX = 0;
        /**
         * Y direction of entity
         * @type {number}
         */
        this.directionY = 0;
    }

    /**
     * Set rigid body
     * @param {RigidBody} body rigid body
     */
    setRigidBody(body) {
        this.body = body;
        // initialize
        if (this.body != null) {
            body.setEntity(this);
            body.init();
        }
    }

    /**
     * Move entity relatively
     * @param {number} dx Relative movement amount in x direction
     * @param {number} dy Relative movement amount in y direction
     */
    deltaMove(dx, dy) {
        this.setPosition(this.x + dx, this.y + dy);
        if (this.collider !== undefined) {
            this.collider.update();
        }
    }
}
