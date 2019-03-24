import { NamedAnimation } from "../../../../base/resources/image/NamedAnimation";
import { IDirectionalImage, isIDirectionalImage } from "../../../../base/resources/image/IDirectionalImage";
import { IClipImage, isIClipImage } from "../../../../base/resources/image/IClipImage";
import { GameAnimation } from "../../../../base/resources/image/GameAnimation";
import { Context } from "../../../../base/resources/image/Context";
import { ResourceID } from "../../../../base/resources/IResourceManager";

/**
 * Delegate named animation
 * - Delegates other animation
 * @extends {NamedAnimation}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate named animation to delegate other animation
 */
export class DelegateNamedAnimation extends NamedAnimation implements IDirectionalImage, IClipImage {
    /**
     * Base image for delegation
     * @protected
     * @type {NamedAnimation}
     */
    protected baseAnimation: NamedAnimation;

    /**
     * Delegate named animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     */
    constructor(baseAnimation: NamedAnimation) {
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
     * Set running animation name
     * @override
     * @param {string} name Running animation name
     */
    setName(name: string) {
        this.baseAnimation.setName(name);
    }

    /**
     * Set all animation size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width: number, height: number) {
        this.baseAnimation.setAllSize(width, height);
    }

    /**
     * Set all animation image ID
     * @override
     * @param {ResourceID} imageID Image ID
     */
    setAllImageID(imageID: ResourceID) {
        this.baseAnimation.setAllImageID(imageID);
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation(): GameAnimation | null {
        return this.baseAnimation.getAnimation();
    }

    /**
     * Get list of animation
     * @override
     * @return {Array<GameImage>} List of animation
     */
    getAnimations(): Array<GameAnimation> {
        return this.baseAnimation.getAnimations();
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation
     */
    setAnimation(animation: GameAnimation) {
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
    update(dt: number) {
        this.baseAnimation.update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        this.baseAnimation.render(ctx, x, y);
    }
}
