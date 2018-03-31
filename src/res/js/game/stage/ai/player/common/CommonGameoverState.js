/**
 * Common gameover state
 * The state in which the player got over game
 * @implements {UnderPlayerState}
 * @classdesc Player gameover state in which the player got over game
 */
class CommonGameoverState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Initialize state
     * @override
     */
    init() {
        this.entity.collider.fixBoundDirectly(0, 32, 64, 64);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        return true;
    }
}
