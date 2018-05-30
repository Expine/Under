/**
 * Player punch state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### About to attack
 * @extends {BaseState}
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
     * Make attack object
     * @protected
     * @return {Entity} Attack object
     */
    makeAttackObject() {
        const punch = this.entity.stage.addEntityByID(200000, {
            x: this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -32 + 22),
            y: this.entity.y + 27,
            z: this.entity.z + 1,
            owner: this.entity,
        });
        return punch;
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
        if (!Util.canEnd(this.entity.getImage()) && this.entity.getImage().getAnimationCount() < this.threshold) {
            return;
        }
        if (!this.attacked) {
            this.makeAttackObject();
            this.attacked = true;
        }
        // change state
        if (Util.canEnd(this.entity.getImage())) {
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
