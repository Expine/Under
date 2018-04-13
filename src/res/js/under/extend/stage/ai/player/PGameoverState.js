/**
 * Player gameover state
 * The state in which the player got over game
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
