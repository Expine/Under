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
        super();
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

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.entity.imageID, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height, 96, 144 - this.entity.directionX * 16, 32, 32);
    }
}
