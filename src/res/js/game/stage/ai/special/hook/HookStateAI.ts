import { NamedStateAI } from "../../../../../under/extend/stage/ai/NamedStateAI";
import { HookReleasedState } from "./HookReleasedState";
import { HookingState } from "./HookingState";

/**
 * Hook state AI
 * - Indicates hooking and released state
 * @extends {NamedStateAI}
 * @classdesc Hook state AI to indicate hooked and released state
 */
export class HookStateAI extends NamedStateAI {
    /**
     * Hook State AI Constructor
     * @constructor
     */
    constructor() {
        super('hooking');

        this.namedStates['hooking'] = new HookingState();
        this.namedStates['released'] = new HookReleasedState();
    }
}
