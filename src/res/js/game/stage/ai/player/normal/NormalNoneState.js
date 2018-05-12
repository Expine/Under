/**
 * Normal none state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - ### It is only for holding information that does nothing
 * @extends {UnderPlayerState}
 * @classdesc Normal none state that is only for holding information that does nothing
 */
class NormalNoneState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return false;
    }
}
