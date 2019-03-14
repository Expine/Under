/**
 * Transitional blink animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Animates transitions to other images by blink
 * @extends {DelegateNamedAnimation}
 * @classdesc Transitional blink animation to animate transitions to other images by blink
 */
class TransitionalBlinkAnimation extends DelegateNamedAnimation {
    /**
     * Transitional blink animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     * @param {nunber} transitionTime Transitional time
     * @param {number} transitionInterval Transitional interval
     */
    constructor(baseAnimation, transitionTime, transitionInterval) {
        super(baseAnimation);

        /**
         * Transitional time
         * @protected
         * @type {number}
         */
        this.transitionTime = transitionTime;
        /**
         * Transitional interval
         * @protected
         * @type {number}
         */
        this.transitionInterval = transitionInterval;

        /**
         * Old image ID
         * @protected
         * @type {number}
         */
        this.oldImageID = -1;
        /**
         * Transition image ID
         * @protected
         * @type {number}
         */
        this.transitionID = -1;
        /**
         * Transitional counter for transition
         * @protected
         * @type {number}
         */
        this.transitionCount = -1;
    }

    /**
     * Set all animation ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
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
    update(dt) {
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
