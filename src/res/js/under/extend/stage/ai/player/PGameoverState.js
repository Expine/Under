/**
 * Player gameover state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - ### The state in which the player got over game
 * @implements {BaseState}
 * @classdesc Player gameover state in which the player got over game
 */
class PGameoverState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        return true;
    }
}
