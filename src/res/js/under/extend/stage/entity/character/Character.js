/**
 * Character
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - ### Implements damagable and animationable
 * @extends {AIListedObject}
 * @implements {IDamagable}
 * @classdesc Character that implements damagable and animationable
 */
class Character extends AIListedObject /* , IDamagable */ { // eslint-disable-line  no-unused-vars
    /**
     * Character constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Hit point
         * @protected
         * @type {number}
         */
        this.hp = 0;
    }

    /**
     * Set hit point
     * @param {number} hp Hit point
     */
    setHP(hp) {
        this.hp = hp;
    }

    /**
     * Get hit point
     * @override
     * @return {number} Hit point
     */
    getHP() {
        return this.hp;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.destroy();
        }
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
        this.image.setSize(this.width * (this.directionX === 0 ? 1 : this.directionX), this.height * (this.directionY === 0 ? 1 : this.directionY));
        super.update(dt);
    }
}
