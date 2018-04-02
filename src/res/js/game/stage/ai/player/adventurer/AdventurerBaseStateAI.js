/**
 * Adventurer base State AI
 * AI with state
 * @implements {NormalBaseStateAI}
 * @classdesc AI with state for determining action
 */
class AdventurerBaseStateAI extends NormalBaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Adventurer base State AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = `hook`;
        if (BaseUtil.implementsOf(this.namedStates[`stationary`], MovableState)) {
            this.namedStates[`stationary`].setMaxVelocity(350, 0);
            this.namedStates[`stationary`].setMovePower(42000, 0);
        }
        if (BaseUtil.implementsOf(this.namedStates[`walk`], MovableState)) {
            this.namedStates[`walk`].setMaxVelocity(350, 0);
            this.namedStates[`walk`].setMovePower(21000, 0);
        }
        if (BaseUtil.implementsOf(this.namedStates[`grabwalk`], MovableState)) {
            this.namedStates[`grab`].setMaxVelocity(110, 0);
            this.namedStates[`grab`].setMovePower(30000, 0);
        }
        if (BaseUtil.implementsOf(this.namedStates[`grabwalk`], MovableState)) {
            this.namedStates[`grabwalk`].setMaxVelocity(110, 0);
            this.namedStates[`grabwalk`].setMovePower(15000, 0);
        }
        for (let it of [`jumping`, `fall`, `falling`]) {
            if (BaseUtil.implementsOf(this.namedStates[it], MovableState)) {
                this.namedStates[it].setMaxVelocity(250, 0);
                this.namedStates[it].setMovePower(15000, 0);
            }
        }
        this.namedStates[`jump`] = new AdventurerJumpState(320);
        this.namedStates[`walkjump`] = new AdventurerJumpState(390);
        this.namedStates[`attack`] = new WildClawState();
        this.namedStates[`hook`] = new AdventurerHookState();
    }
}
