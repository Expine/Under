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
        if (BaseUtil.implementsOf(this.namedStates[`grabwalk`], MovableState)) {
            this.namedStates[`grab`].setMaxVelocity(120, 0);
            this.namedStates[`grab`].setMovePower(40000, 0);
        }
        if (BaseUtil.implementsOf(this.namedStates[`grabwalk`], MovableState)) {
            this.namedStates[`grabwalk`].setMaxVelocity(120, 0);
            this.namedStates[`grabwalk`].setMovePower(20000, 0);
        }
        for (let it of [`jumping`, `fall`, `falling`]) {
            if (BaseUtil.implementsOf(this.namedStates[it], MovableState)) {
                this.namedStates[it].setMaxVelocity(300, 0);
                this.namedStates[it].setMovePower(18000, 0);
            }
        }
        this.namedStates[`jump`] = new WildJumpState(400);
        this.namedStates[`walkjump`] = new WildJumpState(460);
        this.namedStates[`attack`] = new WildClawState();
        this.namedStates[`roll`] = new WildRollState(780000, 240000);
        this.namedStates[`rolling`] = new WildRollingState();
    }
}
