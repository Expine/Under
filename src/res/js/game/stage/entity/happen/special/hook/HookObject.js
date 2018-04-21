/**
 * Hook object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - Enable to set animation
 * - Object caused by special actions
 * - It can get hook position and change state
 * - ### Implements hook and automatically generates post hook object
 * @implements {SpecialObject}
 * @implements {IHook}
 * @classdesc Hook object to implement hook and automatically generate post hook object
 */
class HookObject extends SpecialObject /* , IHook */ { // eslint-disable-line  no-unused-vars
    /**
     * Hook object constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {MutableEntity} owner Owned entity
     * @param {HookObject} previous Previous hook object
     * @param {IString} string Hook string
     * @param {number} restLength Hook rest length
     * @param {number} hookedLength Hook length of hooked
     */
    constructor(x, y, width, height, owner, previous, string, restLength, hookedLength) {
        super(x, y, width, height, owner, -1);

        /**
         * Owned entity
         * @override
         * @protected
         * @type {MutableEntity}
         */
        this.owner = owner;

        /**
         * Previous hook object
         * @protected
         * @type {HookObject}
         */
        this.previous = previous;
        /**
         * Post hook object
         * @protected
         * @type {HookObject}
         */
        this.post = null;

        /**
         * Hook string
         * @protected
         * @type {IString}
         */
        this.string = string;

        /**
         * Hook rest length
         * @protected
         * @type {number}
         */
        this.restLength = restLength;
        /**
         * Hook length of hooked
         * @protected
         * @type {number}
         */
        this.hookedLength = hookedLength;

        /**
         * Generated x position
         * @protected
         * @type {number}
         */
        this.generatedX = owner.directionX >= 0 ? x - owner.width - owner.x : owner.x - x;
        /**
         * Generated y position
         * @protected
         * @type {number}
         */
        this.generatedY = owner.y - y;

        /**
         * Whether it is hooked or not
         * @protected
         * @type {bool}
         */
        this.isHooked = false;
    }

    /**
     * Connect hook to player
     * @protected
     */
    connectPlayer() {
        let x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
        let y = this.owner.y - this.generatedY;
        this.post = new HookPlayer(x, y, 8, 8, this.owner, this, this.string, this.restLength - 15);
    }

    /**
     * Generete hook child
     * @protected
     */
    makeChild(vx, vy) {
        if (this.post === null && this.restLength > 0 && !this.isHooked) {
            if (this.restLength - 15 <= 0) {
                this.connectPlayer();
                return;
            }
            let x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
            let y = this.owner.y - this.generatedY;
            let dx = Math.abs(x - this.getHookX());
            let dy = Math.abs(y - this.getHookY());
            let d = Math.sqrt(dx * dx + dy * dy);
            let l = this.string.getLength() + 3;
            if (d > l) {
                this.post = new HookChild(x, y, 4, 4, this.owner, this, this.string, this.restLength - 15, this.hookedLength);
                this.post.body.setNextAddVelocity(vx, vy);
                this.string.addBody(this.post.body, (this.post.directionX >= 0 ? this.post.getHookX() - this.post.x : this.post.x + this.post.width - this.post.getHookX()), (this.post.directionY > 0 ? this.post.getHookY() - this.post.y : this.post.y + this.post.height - this.post.getHookY()), 3);
                this.stage.addEntity(this.post);
                this.post.deltaMove(-dx * (d - l) / d, -dy * (d - l) / d);
                this.post.makeChild(vx, vy);
            }
        }
    }

    /**
     * Get actor who it belongs to
     * @override
     * @return {Entity} Actor who it belongs to
     */
    getActor() {
        return this.owner;
    }

    /**
     * Hook center x position
     * @interface
     * @return {number} Hook center x position
     */
    getHookX() {}

    /**
     * Hook center x position
     * @interface
     * @return {number} Hook center x position
     */
    getHookY() {}

    /**
     * Create post hook (Do not create it if it already exists)
     * @override
     */
    createPost() {
        this.makeChild(this.body.velocityX, this.body.velocityY);
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {
        if (this.post !== null) {
            this.post.hooked();
        } else {
            this.connectPlayer();
        }
        if (this.restLength < this.hookedLength) {
            this.destroy();
            return;
        }
        this.isHooked = true;
    }

    /**
     * Release hook
     * @override
     */
    release() {
        for (let it of this.ai) {
            if (it instanceof StateAI) {
                it.changeState(`released`);
            }
        }
        if (this.post === null) {
            this.connectPlayer();
        }
    }

    /**
     * Try to remove it
     * @override
     * @return {bool} Whether it was removed
     */
    tryRemove() {
        if (this.post == null) {
            console.log(this);
        }
        if (this.post instanceof HookPlayer) {
            this.destroy();
            return true;
        }
        return false;
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        if (this.previous !== null) {
            this.post.previous = this.previous;
            this.previous.post = this.post;
        }
        this.previous = null;
        this.post = null;
        this.string.removeBody(this.body);
        super.destroy();
    }

    /**
     * Whether the tip of the hook
     * @override
     * @return {bool} Whether the tip of the hook
     */
    isHead() {
        return false;
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        // ctx.fillRect(this.x + shiftX, this.y + shiftY, this.width, this.height, `red`, 1);
        if (this.post !== null) {
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, this.post.getHookX() + shiftX, this.post.getHookY() + shiftY, `red`, 2);
        } else {
            let x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
            let y = this.owner.y - this.generatedY;
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, x + shiftX, y + shiftY, `red`, 2);
        }
    }
}
