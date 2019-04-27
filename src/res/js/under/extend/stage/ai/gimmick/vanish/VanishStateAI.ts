import { NamedStateAI } from "../../NamedStateAI";
import { VanishState } from "./VanishState";
import { ShowState } from "./ShowState";

/**
 * Vanish state AI
 * - Initializes by vanish state
 * @extends {NamedStateAI}
 * @classdesc Vanish state AI to initialize by vanish state
 */
export class VanishStateAI extends NamedStateAI {
    /**
     * Vanish state AI constructor
     * @constructor
     * @param {number} hideTime Hiding time
     * @param {number} showTime Showing time
     * @param {number} intervalTime Interval time
     */
    constructor(hideTime: number, showTime: number, intervalTime: number) {
        super('vanish');

        this.namedStates['vanish'] = new VanishState(hideTime, true);
        this.namedStates['show'] = new ShowState(showTime);
        this.namedStates['interval'] = new VanishState(intervalTime, false);
    }
}
