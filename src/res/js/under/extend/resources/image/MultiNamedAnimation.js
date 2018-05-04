/**
 * Multi named Animation
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - ### Sets and gets by currently name
 * @implements {NamedAnimation}
 * @classdesc Multi named animation to set and get by currently name
 */
class MultiNamedAnimation extends NamedAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Multi named animation constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Dictionary of animation by string
         * @protected
         * @type {Object<string, GameAnimation>}
         */
        this.animation = {};

        /**
         * Running animation name
         * @protected
         * @type {string}
         */
        this.name = null;
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.setSize(width, height);
        }
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        // TODO: Change all is not used
        for (let it in this.animation) {
            if (this.animation.hasOwnProperty(it)) {
                this.animation[it].setImageID(imageID);
            }
        }
        /*
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.setImageID(imageID);
        }
        */
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.init();
        }
    }

    /**
     * Set running animation name
     * @override
     * @param {string} name Running animation name
     * @return {NamedAnimation} This instance
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation() {
        return this.animation[this.name];
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation
     */
    setAnimation(animation) {
        this.animation[this.name] = animation;
    }

    /**
     * Set whether to loop or not
     * @override
     * @param {boolean} loop Whether to loop or not
     */
    setLoop(loop) {
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.setLoop(loop);
        }
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        let anime = this.getAnimation();
        return anime !== undefined && anime.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        let anime = this.getAnimation();
        return anime !== undefined && anime.isEnded();
    }

    /**
     * Get animation count indicating animation progress
     * @return {number} Animation count
     */
    getAnimationCount() {
        let anime = this.getAnimation();
        return anime !== undefined ? anime.getAnimationCount() : 0;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.addAnimation(image, delta);
        }
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.pause();
        }
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.restore();
        }
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.update(dt);
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
        let anime = this.getAnimation();
        if (anime !== undefined) {
            anime.render(ctx, x, y);
        }
    }
}
