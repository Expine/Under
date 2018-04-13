/**
 * Mmutable entity
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - ### It is not fixed and can be moved
 * @implements {InfluentialEntity}
 * @classdesc Mmutable entity that is not fixed and can be moved
 */
class MutableEntity extends InfluentialEntity { // eslint-disable-line  no-unused-vars
    /**
     * Mutable entity constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {number} imageID Image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

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
        body.setEntity(this);
        body.init();
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
