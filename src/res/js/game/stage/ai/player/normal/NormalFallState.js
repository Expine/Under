/**
 * Normal fall state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### To falling, walk and stop
 * @extends {UnderMovableState}
 * @classdesc Normal fall state to falling, walk and stop
 */
class NormalFallState extends UnderMovableState {
    /**
     * Normal fall state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
        super(maxVelocityX, 0, movePower, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move
        this.moveByInput(dt);
        if (Util.canEnd(this.entity.getImage())) {
            this.ai.changeState(`falling`);
        }
        if (Util.onGround(this.entity)) {
            this.transitionUsualState();
        }
        return true;
    }
}
