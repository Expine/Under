import { TransferableStateAI } from "../../TransferabletateAI";
import { CpmmonJudgeState } from "./CpmmonJudgeState";
import { CommonGameoverState } from "./CommonGameoverState";

/**
 * Common base state AI
 * - Implements by common state
 * @extends {TransferableStateAI}
 * @classdesc Common base state AI to implement by common state
 */
export class CommonBaseStateAI extends TransferableStateAI {
    /**
     * Common base state AI constructor
     * @constructor
     */
    constructor() {
        super('none');

        this.namedStates['none'] = new CpmmonJudgeState();
        this.namedStates['gameover'] = new CommonGameoverState();
    }
}
