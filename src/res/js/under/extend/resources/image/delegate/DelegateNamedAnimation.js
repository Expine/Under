/**
 * Delegate named animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Considers the direction
 * - Clips area when rendering
 * - ### Delegates other animation
 * @extends {NamedAnimation}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate named animation to delegate other animation
 */
class DelegateNamedAnimation extends NamedAnimation /* , IDirectionalImage, IClipImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Delegate named animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     */
    constructor(baseAnimation) {
        super();

        /**
         * Base image for delegation
         * @protected
         * @type {NamedAnimation}
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
     * Set running animation name
     * @override
     * @param {string} name Running animation name
     */
    setName(name) {
        this.baseAnimation.setName(name);
    }

    /**
     * Set all animation size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width, height) {
        this.baseAnimation.setAllSize(width, height);
    }

    /**
     * Set all animation image ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        this.baseAnimation.setAllImageID(imageID);
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation() {
        return this.baseAnimation.getAnimation();
    }

    /**
     * Get list of animation
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation
     */
    getAnimations() {
        return this.baseAnimation.getAnimations();
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation
     */
    setAnimation(animation) {
        this.baseAnimation.setAnimation(animation);
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        this.baseAnimation.init();
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        this.baseAnimation.update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.baseAnimation.render(ctx, x, y);
    }
}
