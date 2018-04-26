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
 * - Enable to set animation
 * - ### Implements damagable and animationable
 * @implements {AIListedObject}
 * @implements {IDamagable}
 * @implements {IAnimationable}
 * @classdesc Character that implements damagable and animationable
 */
class Character extends AIListedObject /* , IDamagable, IAnimationable */ { // eslint-disable-line  no-unused-vars
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

        /**
         * Animation for rendering
         * @protected
         * @type {Animation}
         */
        this.animation = null;
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
     * Set animation
     * @override
     * @param {Animation} animation Animation
     */
    setAnimation(animation) {
        this.animation = animation;
    }

    /**
     * Update object
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        if (this.animation !== null) {
            this.animation.update(dt);
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.animation === null) {
            super.render(ctx, shiftX, shiftY);
        } else {
            this.animation.render(ctx, this.x + shiftX, this.y + shiftY, this.width, this.height);
        }
    }
}
