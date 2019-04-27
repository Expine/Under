import { TransferableStateAI } from "../TransferabletateAI";

/**
 * Under state AI
 * - Changes special state by alias
 * @interface
 * @extends {TransferableStateAI}
 * @classdesc Under state AI to change special state by alias
 */
export abstract class UnderStateAI extends TransferableStateAI {
    /**
     * Special action name
     * @protected
     * @type {string}
     */
    protected specialActionName: string;

    /**
     * Under state AI constructor
     * @constructor
     * @param {string} state Initial state name
     */
    constructor(state: string) {
        super(state);

        this.specialActionName = 'special';
    }

    /**
     * Change state
     * @override
     * @param {string} state State to change
     * @return {boolean} Whether change state or not
     */
    changeState(state: string): boolean {
        if (state === 'special') {
            state = this.specialActionName;
        }
        return super.changeState(state);
    }
}
