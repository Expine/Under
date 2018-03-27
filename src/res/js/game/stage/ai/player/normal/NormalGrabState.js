/**
 * State of normal grab action
 * @implements {UnderPlayerState}
 * @classdesc State for normal grab action
 */
class NormalGrabState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Normal Grab state constructor
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
        // judge
        if (!Util.onGround(this.entity) || !Input.it.isKeyPressed(Input.it.down)) {
            if (++this.underCount_ > 5) {
                if (Math.abs(this.entity.body.preVelocityX) < 10) {
                    this.ai.changeState(`stationary`);
                } else {
                    this.ai.changeState(`walk`);
                }
                this.stateAnimation.init();
            }
        } else {
            this.entity.body.setNextAddVelocity(this.entity.body.preVelocityX / 1.01 - this.entity.body.preVelocityX, 0);
            this.underCount_ = 0;
        }
        if (this.stateAnimation.isEnded() && this.underCount_ == 0) {
            // reset and change
            this.entity.changeType(Util.getUnderEntity(this.entity));
        }
        return true;
    }
}
