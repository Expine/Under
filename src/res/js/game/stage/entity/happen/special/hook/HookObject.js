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
 * @interface
 * @implements {SpecialObject}
 * @implements {IHook}
 * @classdesc Hook object to implement hook and automatically generate post hook object
 */
class HookObject extends SpecialObject /* , IHook */ { // eslint-disable-line  no-unused-vars
    /**
     * Hook object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Owned entity
         * @override
         * @protected
         * @type {MutableEntity}
         */
        this.owner = null;

        /**
         * Previous hook object
         * @protected
         * @type {HookObject}
         */
        this.previous = null;
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
        this.string = null;

        /**
         * Hook rest length
         * @protected
         * @type {number}
         */
        this.restLength = 0;
        /**
         * Hook length of hooked
         * @protected
         * @type {number}
         */
        this.hookedLength = 0;

        /**
         * Generated x position
         * @protected
         * @type {number}
         */
        this.generatedX = 0;
        /**
         * Generated y position
         * @protected
         * @type {number}
         */
        this.generatedY = 0;

        /**
         * Whether it is hooked or not
         * @protected
         * @type {boolean}
         */
        this.isHooked = false;
    }

    /**
     * Set owned entity
     * @param {MutableEntity} owner Owned entity
     */
    setOwner(owner) {
        this.owner = owner;
    }

    /**
     * Set hook information
     * @param {HookObject} previous Previous hook object
     * @param {IString} string Hook string
     * @param {number} restLength Hook rest length
     * @param {number} hookedLength Hook length of hooked
     */
    setHookInfo(previous, string, restLength, hookedLength) {
        this.previous = previous;
        this.string = string;
        this.restLength = restLength;
        this.hookedLength = hookedLength;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.generatedX = this.owner.directionX >= 0 ? this.x - this.owner.width - this.owner.x : this.owner.x - this.x;
        this.generatedY = this.owner.y - this.y;
    }

    /**
     * Connect hook to player
     * @protected
     */
    connectPlayer() {
        let x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
        let y = this.owner.y - this.generatedY;
        this.post = new HookPlayer();
        this.post.setPosition(x, y, this.z);
        this.post.setSize(8, 8);
        this.post.setOwner(this.owner);
        this.post.setHookInfo(this, this.string, this.restLength - 15, this.hookedLength);
        this.post.init();
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
                // generate
                this.post = new HookChild();
                this.post.setPosition(x, y, this.z);
                this.post.setSize(4, 4);
                this.post.setOwner(this.owner);
                this.post.setHookInfo(this, this.string, this.restLength - 15, this.hookedLength);
                this.stage.addEntity(this.post);
                // set initial info
                this.post.body.setNextAddVelocity(vx, vy);
                this.string.addBody(this.post.body, (this.post.directionX >= 0 ? this.post.getHookX() - this.post.x : this.post.x + this.post.width - this.post.getHookX()), (this.post.directionY > 0 ? this.post.getHookY() - this.post.y : this.post.y + this.post.height - this.post.getHookY()), 3);
                this.post.deltaMove(-dx * (d - l) / d, -dy * (d - l) / d);
                // generate continuously
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
     * @abstract
     * @return {number} Hook center x position
     */
    getHookX() {}

    /**
     * Hook center x position
     * @abstract
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
     * @return {boolean} Whether it was removed
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
     * @return {boolean} Whether the tip of the hook
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
