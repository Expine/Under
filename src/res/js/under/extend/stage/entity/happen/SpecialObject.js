/**
 * Special object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - Enable to set animation
 * - ### Object caused by special actions
 * @implements {PossessedObject}
 * @implements {IBreakable}
 * @implements {IAnimationable}
 * @classdesc Special object caused by special actions
 */
class SpecialObject extends PossessedObject /* , IBreakable, IAnimationable */ { // eslint-disable-line  no-unused-vars
    /**
     * Special object constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {Entity} owner Owned entity
     * @param {number} [imageID=-1] Image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, owner, imageID = -1) {
        super(x, y, width, height, owner, imageID);

        /**
         * Animation for rendering
         * @protected
         * @type {Animation}
         */
        this.animation = null;
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
        if (this.animation != null) {
            this.animation.update(dt);
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
        if (this.animation == null) {
            super.render(ctx, shiftX, shiftY);
        } else {
            this.animation.render(ctx, this.x + shiftX, this.y + shiftY, this.width, this.height);
        }
    }
}
