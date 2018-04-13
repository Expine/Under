/**
 * State of adventurer jump
 * @implements {NormalJumpState}
 * @classdesc State of adventurer jump
 */
class AdventurerJumpState extends NormalJumpState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // animation
        this.stateAnimation.update(dt * 2);
        return super.apply(dt);
    }
}
