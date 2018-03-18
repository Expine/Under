/**
 * Player gameover state
 * The state in which the player got over game
 * @implements {State}
 * @classdesc Player gameover state in which the player got over game
 */
class PGameoverState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player gameover state Constructor
     * @constructor
     */
    constructor() {
        super(`gameover`);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return true;
    }
}
