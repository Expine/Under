/**
 * Single Animation
 * Manages an animation and run single animation
 * @implements {Animation}
 * @classdesc Animation to manage an animation
 */
class SingleAnimation extends Animation { // eslint-disable-line  no-unused-vars
    /**
     * Single animation constructor
     * @constructor
     * @param {bool} [loop=true] Whether to loop or not
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
         * @type {bool}
         */
        this.loop = loop;

        /**
         * Whether the animation has ended or not
         * @protected
         * @type {bool}
         */
        this.ended = false;
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
     * @param {bool} loop Whether to loop or not
     */
    setLoop(loop) {
        this.loop = loop;
    }

    /**
     * Whether to loop or not
     * @override
     * @return {bool} Whether to loop or not
     */
    isLoop() {
        return this.loop;
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {bool} Whether the animation has ended or not
     */
    isEnded() {
        return this.ended;
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
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        let element = this.animation[this.runningAnimation];
        this.animationCount += dt;
        while (this.animationCount >= element.delta) {
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
     * @param {number} width Image width
     * @param {number} height Image height
     */
    render(ctx, x, y, width, height) {
        if (this.animation.length > 0) {
            let it = this.animation[this.runningAnimation];
            ctx.drawImage(it.imageID, x, y, width, height, it.srcX, it.srcY, it.srcW, it.srcH);
        }
    }
}
