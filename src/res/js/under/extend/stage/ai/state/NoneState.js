/**
 * None state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Does nothing
 * @extends {State}
 * @classdesc None state to do nothing
 */
class NoneState extends State {
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return true;
    }
}
