/**
 * Normal stationary state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### To walk, jump, grab, attack, special and fall
 * @implements {UnderMovableState}
 * @classdesc Normal stationary state to walk, jump, grab, attack, special and fall
 */
class NormalStationaryState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal stationary state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super(maxVelocityX, 0, walkPower, 0);

        /**
         * Falling count
         * @protected
         * @type {number}
         */
        this.fallCount = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.fallCount = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move
        let moved = this.moveByInput(dt);
        if (moved) {
            this.ai.changeState(`walk`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.key.isPressed(Input.key.down())) {
                this.ai.changeState(`grab`);
            }
            if (Input.key.isPressed(Input.key.up())) {
                if (moved) {
                    this.ai.changeState(`walkjump`);
                } else {
                    this.ai.changeState(`jump`);
                }
            }
            if (Input.key.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
            if (Input.key.isPress(Input.key.sub())) {
                this.ai.changeState(`special`);
            }
            this.fallCount = 0;
        } else {
            if (++this.fallCount > 2) {
                this.ai.changeState(`fall`);
            }
        }
        return true;
    }
}
