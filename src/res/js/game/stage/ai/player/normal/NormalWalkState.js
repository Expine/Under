/**
 * Normal walk state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### To stop, jump, grab, attack, special and fall
 * @implements {UnderMovableState}
 * @classdesc Normal walk state to stop, jump, grab, attack, special and fall
 */
class NormalWalkState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal walk state constructor
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
        this.fallCount = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // input
        let input = this.moveByInput(dt);
        // stationary
        if (!input) {
            this.ai.changeState(`stationary`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.it.isPressed(Input.key.down())) {
                this.ai.changeState(`grab`);
            }
            if (Input.it.isPressed(Input.key.up())) {
                this.ai.changeState(`walkjump`);
            }
            if (Input.it.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
            if (Input.it.isPress(Input.key.sub())) {
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
