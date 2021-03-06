/**
 * Common gameover state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - ### The state in which the player got over game
 * @extends {UnderPlayerState}
 * @classdesc Common gameover state in which the player got over game
 */
class CommonGameoverState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.entity.collider.fixBound(0, this.entity.height / 2, this.entity.width, this.entity.height);
    }

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
