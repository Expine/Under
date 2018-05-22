/**
 * Attack object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - ### Object indicating attack that have lifespan
 * @extends {AIListedObject}
 * @implements {IBreakable}
 * @classdesc Attack object indicating attack that have lifespan
 */
class AttackObject extends AIListedObject /* , IBreakable */ { // eslint-disable-line  no-unused-vars
    /**
     * Attack object constructor
     * @constructor
     * @param {number} lifespan Lifespan of attack object
     */
    constructor(lifespan) {
        super();

        /**
         * Lifespan of attack object
         * @protected
         * @type {number}
         */
        this.lifespan = lifespan;
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
    }

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
        super.update(dt);
    }
}
