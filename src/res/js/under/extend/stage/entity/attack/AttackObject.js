/**
 * Attack object
 * Object indicating attack
 * @implements {SingleAIObject}
 * @classdesc Attack object indicating attack
 */
class AttackObject extends SingleAIObject /* , Breakable */ { // eslint-disable-line  no-unused-vars
    /**
     * Attack object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} [imageID=-1] image ID for rendering (if has not, -1)
     * @param {number} [lifespan=0] Lifespan of attack object
     */
    constructor(x, y, width, height, imageID = -1, lifespan = 0) {
        super(x, y, width, height, imageID);

        /**
         * Lifespan of attack object
         * @protected
         * @type {number}
         */
        this.lifespan = lifespan;
    }

    /**
     * Set collider
     * @override
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        super.setCollider(collider);
        collider.isResponse = false;
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
    }

    /**
     * Check collisions and process if the object collides
     * @protected
     * @interface
     * @return {bool} Collision or not
     */
    judgeCollision() {}

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        this.lifespan -= dt;
        if (this.lifespan < 0) {
            this.destroy();
            return;
        }
        if (!this.judgeCollision()) {
            super.update(dt);
        }
    }
}
