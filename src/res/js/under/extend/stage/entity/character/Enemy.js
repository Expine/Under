/**
 * Enemy
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
 * - ### Entity operated as the enemy
 * @implements {Character}
 * @classdesc Enemy to be operated as the enemy
 */
class Enemy extends Character { // eslint-disable-line  no-unused-vars
    /**
     * Enemy constructor
     * @constructor
     */
    constructor() {
        super();

        // initialize
        this.setHP(1);
        this.directionX = 1;
    }

    /**
     * Render entity
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.animation != null) {
            // TODO: Should be separate
            if (Util.onGround(this)) {
                this.animation.init();
            }
        }
        super.render(ctx, shiftX, shiftY);
    }
}
