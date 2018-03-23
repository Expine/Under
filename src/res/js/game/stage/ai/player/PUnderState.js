/**
 * State of player under action
 * @implements {BaseState}
 * @classdesc State that player can do under action
 */
class PUnderState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player under state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Count for action
         * @private
         * @type {number}
         */
        this.underCount_ = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        this.underCount_ = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        if (Util.onGround(this.entity) && Input.it.isDownPressed()) {
            this.underCount_ += dt;
            this.entity.body.setNextAddVelocity(this.entity.body.preVelocityX / 1.01 - this.entity.body.preVelocityX, 0);
            if (this.underCount_ > 200) {
                this.entity.changeType(Util.getUnderEntity(this.entity));
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
