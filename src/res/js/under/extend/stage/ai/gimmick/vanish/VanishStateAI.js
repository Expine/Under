/**
 * Vanish state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Initializes by vanish state
 * @extends {NamedStateAI}
 * @classdesc Vanish state AI to initialize by vanish state
 */
class VanishStateAI extends NamedStateAI {
    /**
     * Vanish state AI constructor
     * @constructor
     * @param {number} hideTime Hiding time
     * @param {number} showTime Showing time
     * @param {number} intervalTime Interval time
     */
    constructor(hideTime, showTime, intervalTime) {
        super(`vanish`);

        this.namedStates[`vanish`] = new VanishState(hideTime, true);
        this.namedStates[`show`] = new ShowState(showTime);
        this.namedStates[`interval`] = new VanishState(intervalTime, false);
    }
}
