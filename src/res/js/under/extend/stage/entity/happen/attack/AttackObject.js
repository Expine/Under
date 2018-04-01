/**
 * Attack object
 * Object indicating attack
 * @implements {PossessedObject}
 * @classdesc Attack object indicating attack
 */
class AttackObject extends PossessedObject /* , Breakable, Animationable */ { // eslint-disable-line  no-unused-vars
    /**
     * Attack object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {Entity} entity Attacker entity
     * @param {number} [imageID=-1] image ID for rendering (if has not, -1)
     * @param {number} [lifespan=0] Lifespan of attack object
     */
    constructor(x, y, width, height, entity, imageID = -1, lifespan = 0) {
        super(x, y, width, height, entity, imageID);

        /**
         * Lifespan of attack object
         * @protected
         * @type {number}
         */
        this.lifespan = lifespan;

        /**
         * Animation for rendering
         * @protected
         * @type {Animation}
         */
        this.animation = null;
    }

    /**
     * Set collider
     * @override
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        super.setCollider(collider);
        collider.isResponse = false;
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
     * Check collisions and process if the object collides
     * @protected
     * @interface
     * @return {bool} Collision or not
     */
    judgeCollision() {}

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
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
        if (!this.judgeCollision()) {
            super.update(dt);
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
