/**
 * Attack object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - Enable to set animation
 * - Object caused by special actions
 * - ### Object indicating attack that have lifespan
 * @implements {SpecialObject}
 * @classdesc Attack object indicating attack that have lifespan
 */
class AttackObject extends SpecialObject { // eslint-disable-line  no-unused-vars
    /**
     * Attack object constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {Entity} owner Owned entity
     * @param {number} [imageID=-1] Image ID for rendering (if has not, -1)
     * @param {number} [lifespan=0] Lifespan of attack object
     */
    constructor(x, y, width, height, owner, imageID = -1, lifespan = 0) {
        super(x, y, width, height, owner, imageID);

        /**
         * Lifespan of attack object
         * @protected
         * @type {number}
         */
        this.lifespan = lifespan;
    }

    /**
     * Update attack after update it
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateAttack(dt) {}

    /**
     * Update object
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.lifespan -= dt;
        if (this.lifespan < 0) {
            this.destroy();
            return;
        }
        if (this.animation != null) {
            this.animation.update(dt);
        }
        super.update(dt);
        this.updateAttack(dt);
    }
}
