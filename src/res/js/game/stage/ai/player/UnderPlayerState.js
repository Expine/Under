/**
 * Under player state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - ### Render entity by entity own image ID for change type
 * @interface
 * @extends {TransferableState}
 * @classdesc Under player state to render entity by entity own image ID
 */
class UnderPlayerState extends TransferableState {
    /**
     * Transition usual state such as stationary, walk, fall
     * @protected
     */
    transitionUsualState() {
        if (!Util.onGround(this.entity)) {
            this.ai.changeState(`fall`);
        } else if (Math.abs(this.entity.body.velocityX) < 100) {
            this.ai.changeState(`stationary`);
        } else {
            this.ai.changeState(`walk`);
        }
    }
}
