/**
 * Under state AI
 * AI with state
 * @extends {TransferableStateAI}
 * @classdesc AI with state for determining action
 */
class UnderStateAI extends TransferableStateAI { // eslint-disable-line  no-unused-vars
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
     */
    changeState(state) {
        if (state == `special`) {
            state = this.specialActionName;
        }
        super.changeState(state);
    }
}
