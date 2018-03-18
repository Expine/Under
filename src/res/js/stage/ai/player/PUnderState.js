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
        super(`under`);

        /**
         * Count for action
         * @type {number}
         */
        this.stateCount = 0;
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
}
