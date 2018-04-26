/**
 * Player
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Enable to set animation
 * - Implements damagable and animationable
 * - Entity that manages AI according to state and rendering by it
 * - Player function interface
 * - ### Entity operated by the player
 * @implements {StateCharacter}
 * @implements {IPlayable}
 * @classdesc Player to be operate by the player
 */
class Player extends StateCharacter /* , IPlayable */ { // eslint-disable-line  no-unused-vars
    /**
     * Player constructor
     * @constructor
     */
    constructor() {
        super();

        // initialize
        this.setHP(3);
        this.directionX = 1;

        /**
         * Remaining time of invincible state
         * @protected
         * @type {number}
         */
        this.invincible = 0;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        if (this.invincible == 0 && this.hp > 0) {
            this.hp -= damage;
            this.invincible = 1000;
        }
    }

    /**
     * Get x position for camera
     * @override
     * @return {number} X position for camera
     */
    getCameraX() {
        return this.x + this.width / 2;
    }

    /**
     * Get y position for camera
     * @override
     * @return {number} y position for camera
     */
    getCameraY() {
        return this.y + this.height / 2;
    }

    /**
     * Update object
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.invincible -= dt;
        if (this.invincible <= 0) {
            this.invincible = 0;
        }
        super.update(dt);
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.invincible % 2 == 0 || this.hp <= 0) {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
