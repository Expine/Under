/**
 * State of player under action
 * @implements {State}
 * @classdesc State that player can do under action
 */
class PUnderState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player under state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Count for action
         * @type {number}
         */
        this.underCount_ = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (Util.onGround(this.entity) && Input.it.isDownPressed()) {
            this.underCount_ += dt;
            this.entity.body.velocityX /= 1.01;
            if (this.underCount_ > 200) {
                this.entity.changeType(Util.getGround(this.entity));
                this.underCount_ = 0;
            }
            return true;
        }
        // initialize
        if (this.underCount_ > 0) {
            this.underCount_ -= dt;
        } else {
            this.underCount_ = 0;
        }
        return false;
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.entity.imageID, 96, 208 - this.entity.direction * 16, 32, 32, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}
