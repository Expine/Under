/**
 * Common base state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - ### Implements by common state
 * @extends {TransferableStateAI}
 * @classdesc Common base state AI to implement by common state
 */
class CommonBaseStateAI extends TransferableStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Common base state AI constructor
     * @constructor
     */
    constructor() {
        super(`none`);

        this.namedStates[`none`] = new CommonNoneState();
        this.namedStates[`gameover`] = new CommonGameoverState();
    }
}
