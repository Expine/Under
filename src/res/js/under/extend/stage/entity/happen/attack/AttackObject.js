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
 * - Object caused by special actions
 * - ### Object indicating attack that have lifespan
 * @interface
 * @implements {SpecialObject}
 * @classdesc Attack object indicating attack that have lifespan
 */
class AttackObject extends SpecialObject { // eslint-disable-line  no-unused-vars
    /**
     * Attack object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Lifespan of attack object
         * @protected
         * @type {number}
         */
        this.lifespan = 0;
    }

    /**
     * Set lifespal
     * @param {number} lifespan Lifespan of attack object
     */
    setLifeSpan(lifespan) {
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
        super.update(dt);
        this.updateAttack(dt);
    }
}
