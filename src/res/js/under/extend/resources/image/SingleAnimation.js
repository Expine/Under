/**
 * Single Animation
 * - Renders image
 * - Manages animation
 * - ### Runs single animation
 * @implements {GameAnimation}
 * @classdesc Animation to run single animation
 */
class SingleAnimation extends GameAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Single animation constructor
     * @constructor
     * @param {boolean} [loop=true] Whether to loop or not
     */
    constructor(loop = true) {
        super();

        /**
         * List of animation element
         * @protected
         * @type {Array<AnimationElement>}
         */
        this.animation = [];

        /**
         * Animation counter
         * @protected
         * @type {number}
         */
        this.animationCount = 0;

        /**
         * Running animation number
         * @protected
         * @type {number}
         */
        this.runningAnimation = 0;

        /**
         * Whether to loop or not
         * @protected
         * @type {boolean}
         */
        this.loop = loop;

        /**
         * Whether the animation has ended or not
         * @protected
         * @type {boolean}
         */
        this.ended = false;

        /**
         * Whether pause animation or not
         * @protected
         * @type {boolean}
         */
        this.paused = false;
        /**
         * Image ID
         * @protected
         * @type {number}
         */
        this.imageID = -1;

        /**
         * Image width
         * @protected
         * @type {number}
         */
        this.width = 0;
        /**
         * Image height
         * @protected
         * @type {number}
         */
        this.height = 0;
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        this.imageID = imageID;
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        this.animationCount = 0;
        this.runningAnimation = 0;
        this.ended = false;
    }

    /**
     * Set whether to loop or not
     * @override
     * @param {boolean} loop Whether to loop or not
     */
    setLoop(loop) {
        this.loop = loop;
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        return this.loop;
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        return this.ended;
    }

    /**
     * Get animation count indicating animation progress
     * @return {number} Animation count
     */
    getAnimationCount() {
        return this.runningAnimation / this.animation.length;
    }

    /**
     * Add animation
     * @override
     * @param {AnimationElement} element Animation element
     */
    addAnimation(element) {
        this.animation.push(element);
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        this.paused = true;
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        this.paused = false;
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        if (this.paused) {
            return;
        }
        let element = this.animation[this.runningAnimation];
        this.animationCount += dt;
        while (element !== undefined && this.animationCount >= element.delta) {
            this.animationCount -= element.delta;
            if (++this.runningAnimation >= this.animation.length) {
                this.ended = true;
                if (this.loop) {
                    this.runningAnimation = 0;
                } else {
                    this.runningAnimation = this.animation.length - 1;
                }
            }
            element = this.animation[this.runningAnimation];
        }
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        if (this.animation.length > 0) {
            let it = this.animation[this.runningAnimation];
            ctx.drawImage(this.imageID != -1 ? this.imageID : it.imageID, x, y, this.width, this.height, it.srcX, it.srcY, it.srcW, it.srcH);
        }
    }
}
