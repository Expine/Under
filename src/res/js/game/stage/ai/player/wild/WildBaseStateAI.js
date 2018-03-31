/**
 * Wild base State AI
 * AI with state
 * @implements {NormalBaseStateAI}
 * @classdesc AI with state for determining action
 */
class WildBaseStateAI extends NormalBaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Wild base State AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = `roll`;
        if (BaseUtil.implementsOf(this.namedStates[`stationary`], MovableState)) {
            this.namedStates[`stationary`].setMaxVelocity(400, 0);
            this.namedStates[`stationary`].setMovePower(48000, 0);
        }
        if (BaseUtil.implementsOf(this.namedStates[`walk`], MovableState)) {
            this.namedStates[`walk`].setMaxVelocity(400, 0);
            this.namedStates[`walk`].setMovePower(24000, 0);
        }
        if (BaseUtil.implementsOf(this.namedStates[`jumping`], MovableState)) {
            this.namedStates[`jumping`].setMaxVelocity(300, 0);
            this.namedStates[`jumping`].setMovePower(18000, 0);
        }
        if (BaseUtil.implementsOf(this.namedStates[`fall`], MovableState)) {
            this.namedStates[`fall`].setMaxVelocity(300, 0);
            this.namedStates[`fall`].setMovePower(18000, 0);
        }
        if (BaseUtil.implementsOf(this.namedStates[`falling`], MovableState)) {
            this.namedStates[`falling`].setMaxVelocity(300, 0);
            this.namedStates[`falling`].setMovePower(18000, 0);
        }
        this.namedStates[`jump`] = new WildJumpState(400);
        this.namedStates[`walkjump`] = new WildJumpState(460);
        this.namedStates[`attack`] = new WildClawState();
        this.namedStates[`roll`] = new WildRollState(780000, 240000);
        this.namedStates[`rolling`] = new WildRollingState();
    }
}
