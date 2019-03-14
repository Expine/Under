/**
 * Normal special state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - ### Does special action
 * @extends {UnderPlayerState}
 * @classdesc Normal special state to do special action
 */
class NormalSpecialState extends UnderPlayerState {
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (!Input.key.isPressed(Input.key.sub())) {
            // change state
            this.transitionUsualState();
        }
        return true;
    }
}
