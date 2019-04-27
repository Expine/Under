import { HookStateAI } from "./HookStateAI";
import { HeadHookingState } from "./HeadHookingState";
import { NoneState } from "../../../../../under/extend/stage/ai/state/NoneState";

/**
 * Head Hook state AI
 * - Also indicates hooked state
 * @extends {HookStateAI}
 * @classdesc AI with state for determining action
 */
export class HeadHookStateAI extends HookStateAI {
    /**
     * Head hook State AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.namedStates['hooking'] = new HeadHookingState();
        this.namedStates['hooked'] = new NoneState();
    }
}
