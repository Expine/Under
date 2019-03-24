import { GameAnimation } from "../../../../base/resources/image/GameAnimation";
import { IDirectionalImage, isIDirectionalImage } from "../../../../base/resources/image/IDirectionalImage";
import { IClipImage, isIClipImage } from "../../../../base/resources/image/IClipImage";
import { GameImage } from "../../../../base/resources/image/GameImage";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Delegate animation
 * - Delegates other animation
 * @extends {GameAnimation}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate animation to delegate other animation
 */
export class DelegateAnimation extends GameAnimation implements IDirectionalImage, IClipImage {
    /**
     * Base image for delegation
     * @protected
     * @type {GameAnimation}
     */
    protected baseAnimation: GameAnimation;

    /**
     * Delegate animation constructor
     * @constructor
     * @param {GameAnimation} baseAnimation Base image for delegation
     */
    constructor(baseAnimation: GameAnimation) {
        super();
        this.baseAnimation = baseAnimation;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX: number, directionY: number) {
        if (isIDirectionalImage(this.baseAnimation)) {
            this.baseAnimation.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipHeight Cliping height
     */
    setClipArea(clipX: number, clipY: number, clipWidth: number, clipHeight: number) {
        if (isIClipImage(this.baseAnimation)) {
            this.baseAnimation.setClipArea(clipX, clipY, clipWidth, clipHeight);
        }
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop(): boolean {
        return this.baseAnimation.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded(): boolean {
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
    getAnimationCount(): number {
        return this.baseAnimation.getAnimationCount();
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image: GameImage, delta: number) {
        this.baseAnimation.addAnimation(image, delta);
    }

    /**
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages(): Array<GameImage> {
        return this.baseAnimation.getImages();
    }

    /**
     * Get current image of animation
     * @abstract
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage(): GameImage | null {
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
    update(dt: number) {
        this.baseAnimation.update(dt);
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        this.baseAnimation.render(ctx, x, y);
    }
}
