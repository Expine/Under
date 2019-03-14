/**
 * Delegate animation
 * - Renders image
 * - Manages animation
 * - Considers the direction
 * - Clips area when rendering
 * - ### Delegates other animation
 * @extends {GameAnimation}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate animation to delegate other animation
 */
class DelegateAnimation extends GameAnimation /* , IDirectionalImage, IClipImage */ {
    /**
     * Delegate animation constructor
     * @constructor
     * @param {GameAnimation} baseAnimation Base image for delegation
     */
    constructor(baseAnimation) {
        super();

        /**
         * Base image for delegation
         * @protected
         * @type {GameAnimation}
         */
        this.baseAnimation = baseAnimation;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        if (BaseUtil.implementsOf(this.baseAnimation, IDirectionalImage)) {
            this.baseAnimation.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        if (BaseUtil.implementsOf(this.baseAnimation, IClipImage)) {
            this.baseAnimation.setClipArea(clipX, clipY, clipWidth, clipHeight);
        }
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        return this.baseAnimation.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        return this.baseAnimation.isEnded();
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        this.baseAnimation.pause();
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        this.baseAnimation.restore();
    }

    /**
     * Get animation count indicating animation progress
     * @override
     * @return {number} Animation count
     */
    getAnimationCount() {
        return this.baseAnimation.getAnimationCount();
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        this.baseAnimation.addAnimation(image, delta);
    }

    /**
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {
        return this.baseAnimation.getImages();
    }

    /**
     * Get current image of animation
     * @abstract
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {
        return this.baseAnimation.getCurrentImage();
    }

    /**
     * Initialize image
     * @override
     */
    init() {
        this.baseAnimation.init();
    }

    /**
     * Update image
     * @override
     * @param {number} dt
     */
    update(dt) {
        this.baseAnimation.update(dt);
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.baseAnimation.render(ctx, x, y);
    }
}
