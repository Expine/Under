/**
 * Under state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - ### Changes special state by alias
 * @interface
 * @extends {TransferableStateAI}
 * @classdesc Under state AI to change special state by alias
 */
class UnderStateAI extends TransferableStateAI {
    /**
     * Under state AI constructor
     * @constructor
     * @param {string} state Initial state name
     */
    constructor(state) {
        super(state);

        /**
         * Special action name
         * @protected
         * @type {string}
         */
        this.specialActionName = `special`;
    }

    /**
     * Change state
     * @override
     * @param {string} state State to change
     * @return {boolean} Whether change state or not
     */
    changeState(state) {
        if (state === `special`) {
            state = this.specialActionName;
        }
        return super.changeState(state);
    }
}
