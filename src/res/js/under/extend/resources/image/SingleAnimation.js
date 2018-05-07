/**
 * Single animation
 * - Renders image
 * - Manages animation
 * - ### Runs single animation
 * @extends {GameAnimation}
 * @classdesc Single animation to run single animation
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
         * @type {Array<GameImage>}
         */
        this.animation = [];
        /**
         * List of animation delta number
         * @protected
         * @type {Array<number>}
         */
        this.deltas = [];

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
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        for (let it of this.animation) {
            it.setSize(width, height);
        }
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        for (let it of this.animation) {
            it.setImageID(imageID);
        }
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.animation.length == 0 ? 0 : this.animation[this.runningAnimation].getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.animation.length == 0 ? 0 : this.animation[this.runningAnimation].getHeight();
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
     * Update animation
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // check
        if (this.paused || this.animation.length == 0) {
            return;
        }
        if (!this.isLoop() && this.isEnded()) {
            return;
        }
        // update animation
        let delta = this.deltas[this.runningAnimation];
        this.animationCount += dt;
        while (this.animationCount >= delta) {
            this.animationCount -= delta;
            if (++this.runningAnimation >= this.animation.length) {
                this.ended = true;
                if (this.isLoop()) {
                    this.runningAnimation = 0;
                } else {
                    this.runningAnimation--;
                }
            }
            delta = this.deltas[this.runningAnimation];
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
            this.animation[this.runningAnimation].render(ctx, x, y);
        }
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
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        this.animation.push(image);
        this.deltas.push(delta);
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
}
