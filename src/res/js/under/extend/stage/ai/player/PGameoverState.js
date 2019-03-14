/**
 * Player gameover state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### The state in which the player got over game
 * @extends {BaseState}
 * @classdesc Player gameover state in which the player got over game
 */
class PGameoverState extends BaseState {
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
