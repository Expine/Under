/**
 * Character
 * Manages AI by list
 * And can be damaged and destroyed
 * @implements {SingleAIObject}
 * @implements {Damagable}
 * @implements {Animationable}
 * @classdesc Character that can be damaged and destroyed
 */
class Character extends SingleAIObject /* , Damagable, Animationable */ { // eslint-disable-line  no-unused-vars
    /**
     * Character constructor
     * @constructor
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} [imageID=-1] image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

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
     * @param {number} dt - delta time
     */
    update(dt) {
        super.update(dt);
        if (this.animation != null) {
            this.animation.update(dt);
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.animation == null) {
            super.render(ctx, shiftX, shiftY);
        } else {
            this.animation.render(ctx, this.x + shiftX, this.y + shiftY, this.width, this.height);

            // For debug to render collider
            if (Engine.debug && this.collider !== undefined) {
                this.collider.render(ctx, shiftX, shiftY);
            }
        }
    }
}
