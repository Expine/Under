import { DelegateNamedAnimation } from "../delegate/DelegateNamedAnimation";
import { NamedAnimation } from "../../../../base/resources/image/NamedAnimation";

/**
 * Transitional blink animation
 * - Animates transitions to other images by blink
 * @extends {DelegateNamedAnimation}
 * @classdesc Transitional blink animation to animate transitions to other images by blink
 */
export class TransitionalBlinkAnimation extends DelegateNamedAnimation {
    /**
     * Transitional time
     * @protected
     * @type {number}
     */
    protected transitionTime: number;
    /**
     * Transitional interval
     * @protected
     * @type {number}
     */
    protected transitionInterval: number;

    /**
     * Old image ID
     * @protected
     * @type {number}
     */
    protected oldImageID: number;
    /**
     * Transition image ID
     * @protected
     * @type {number}
     */
    protected transitionID: number;
    /**
     * Transitional counter for transition
     * @protected
     * @type {number}
     */
    protected transitionCount: number;

    /**
     * Transitional blink animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     * @param {number} transitionTime Transitional time
     * @param {number} transitionInterval Transitional interval
     */
    constructor(baseAnimation: NamedAnimation, transitionTime: number, transitionInterval: number) {
        super(baseAnimation);

        this.transitionTime = transitionTime;
        this.transitionInterval = transitionInterval;
        this.oldImageID = -1;
        this.transitionID = -1;
        this.transitionCount = -1;
    }

    /**
     * Set all animation ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID: number) {
        if (this.transitionID === -1) {
            this.transitionID = imageID;
        } else {
            this.transitionCount = this.transitionTime;
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
            if ((this.transitionCount * 1000) % (this.transitionInterval * 2) >= this.transitionInterval) {
                super.setAllImageID(this.oldImageID);
            } else {
                super.setAllImageID(this.transitionID);
            }
        } else if (this.transitionCount !== -1) {
            this.transitionCount = -1;
            super.setAllImageID(this.transitionID);
        }
        super.update(dt);
    }
}
