/**
 * Single loop Animation
 * Manages an animation and run single, loop animation
 * @classdesc Animation to manage an animation
 */
class SingleAnimation extends Animation { // eslint-disable-line  no-unused-vars
    /**
     * Single animation constructor
     * @constructor
     * @param {bool} [isLoop=true] Whether to loop or not
     */
    constructor(isLoop = true) {
        super();

        /**
         * List of animation
         * @type {Array<AnimationElement>}
         */
        this.animation = [];

        /**
         * Animation counter
         * @type {number}
         */
        this.animationCount = 0;

        /**
         * Running animation number
         * @type {number}
         */
        this.runningAnimation = 0;

        /**
         * Whether to loop or not
         * @type {bool}
         */
        this.isLoop = isLoop;

        /**
         * Whether the animation has ended or not
         * @type {bool}
         */
        this.isEnded = false;
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        this.animationCount = 0;
        this.runningAnimation = 0;
    }

    /**
     * Set whether to loop or not
     * @param {bool} isLoop Whether to loop or not
     */
    setLoop(isLoop) {
        this.isLoop = isLoop;
    }

    /**
     * Whether the animation has ended or not
     * @return {bool} Whether the animation has ended or not
     */
    isEnded() {
        return this.isEnded;
    }

    /**
     * Add animation
     * @override
     * @param {AnimationElement} element Animation element
     */
    addAnimatiion(element) {
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
                this.isEnded = true;
                if (this.isLoop) {
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
        let it = this.animation[this.runningAnimation];
        ctx.drawImage(it.imageID, x, y, width, height, it.srcX, it.srcY, it.srcW, it.srcH);
    }
}
