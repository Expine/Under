/**
 * Player punch state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - ### About to attack
 * @implements {BaseState}
 * @classdesc Player punch state that about to attack
 */
class PPunchState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player punch state
     * @constructor
     */
    constructor() {
        super();

        /**
         * Whether it attacked or not
         * @protected
         * @type {boolean}
         */
        this.attacked = false;

        /**
         * Animation threshold for starting attack
         * @protected
         * @type {number}
         */
        this.threshold = 0.5;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        this.attacked = false;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (!this.stateAnimation.isEnded() && this.stateAnimation.getAnimationCount() < this.threshold) {
            return;
        }
        if (!this.attacked) {
            this.entity.stage.addEntity(this.makeAttackObject());
            this.attacked = true;
        }
        // change state
        if (this.stateAnimation.isEnded()) {
            // punch
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}
