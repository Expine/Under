/**
 * Player
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Implements damagable and animationable
 * - Entity that manages AI according to state and rendering by it
 * - Player function interface
 * - ### Entity operated by the player
 * @extends {StateCharacter}
 * @implements {IPlayable}
 * @classdesc Player to be operate by the player
 */
class Player extends StateCharacter /* , IPlayable, ITakeOver */ {
    /**
     * Player constructor
     * @constructor
     */
    constructor() {
        super();

        // initialize
        this.setHP(3);
        this.setDirection(1);

        /**
         * Remaining time of invincible state
         * @protected
         * @type {number}
         */
        this.invincible = 0;

        /**
         * Player unique name
         * @protected
         * @type {string}
         */
        this.uniqueName = ``;
    }

    /**
     * Set unique name
     * @param {string} name Unique name
     */
    setUniqueName(name) {
        this.uniqueName = name;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        if (this.invincible === 0 && this.hp > 0) {
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
     * Judge whether game over or not
     * @override
     * @return {boolean} whether game over or not
     */
    isGameover() {
        return this.getHP() <= 0 || this.stage.getStageHeight() < this.y;
    }

    /**
     * Judged whether it is the same entity to be handed over
     * @override
     * @param {Object} target Target element
     * @return {boolean} Whether it is the same entity to be handed over
     */
    equals(target) {
        return target instanceof Player && target.uniqueName === this.uniqueName;
    }

    /**
     * Take over information
     * @override
     * @param {Object} target Target element
     */
    takeOver(target) {
        if (target instanceof Player) {
            target.setHP(this.getHP());
        }
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
        if (this.invincible % 2 === 0 || this.hp <= 0) {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
