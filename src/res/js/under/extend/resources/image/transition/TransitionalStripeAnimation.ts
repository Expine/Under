import { DelegateNamedAnimation } from "../delegate/DelegateNamedAnimation";
import { NamedAnimation } from "../../../../base/resources/image/NamedAnimation";
import { Context } from "../../../../base/resources/image/Context";
import { isIClipImage } from "../../../../base/resources/image/IClipImage";
import { ResourceID } from "../../../../base/resources/IResourceManager";

/**
 * Transitional stripe animation
 * - Animates transitions to other images by stripe
 * @extends {DelegateNamedAnimation}
 * @classdesc Transitional stripe animation to animate transitions to other images by stripe
 */
export class TransitionalStripeAnimation extends DelegateNamedAnimation {
    /**
     * Transitional time
     * @protected
     * @type {number}
     */
    protected transitioTime: number;

    /**
     * Old image ID
     * @protected
     * @type {ResourceID}
     */
    protected oldImageID: ResourceID;
    /**
     * Transition image ID
     * @protected
     * @type {ResourceID}
     */
    protected transitionID: ResourceID;
    /**
     * Transitional counter for transition
     * @protected
     * @type {number}
     */
    protected transitionCount: number;

    /**
     * Transitional stripe animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     * @param {number} transitioTime Transitional time
     */
    constructor(baseAnimation: NamedAnimation, transitioTime: number) {
        super(baseAnimation);

        this.transitioTime = transitioTime;
        this.oldImageID = -1;
        this.transitionID = -1;
        this.transitionCount = -1;
    }

    /**
     * Set all animation ID
     * @override
     * @param {ResourceID} imageID Image ID
     */
    setAllImageID(imageID: ResourceID) {
        if (this.transitionID === -1) {
            this.transitionID = imageID;
        } else {
            this.transitionCount = this.transitioTime;
        }
        this.oldImageID = this.transitionID;
        this.transitionID = imageID;
        super.setAllImageID(imageID);
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt: number) {
        if (this.transitionCount > 0) {
            this.transitionCount -= dt / 1000;
        }
        super.update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        if (this.transitionCount > 0) {
            super.setAllImageID(this.oldImageID);
            const image = super.getAnimation();
            const oldHeight = Math.floor(super.getHeight() * (this.transitionCount / this.transitioTime));
            if (isIClipImage(image)) {
                image.setClipArea(x, y, super.getWidth(), oldHeight);
            }
            super.render(ctx, x, y);

            super.setAllImageID(this.transitionID);
            const newHeight = super.getHeight() - oldHeight;
            if (isIClipImage(image)) {
                image.setClipArea(x, y + oldHeight, super.getWidth(), newHeight);
            }
            super.render(ctx, x, y);
            if (isIClipImage(image)) {
                image.setClipArea(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            }
        } else {
            super.render(ctx, x, y);
        }
    }
}
