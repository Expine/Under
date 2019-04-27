import { UnderStateAI } from "../UnderStateAI";
import { NormalStationaryState } from "./NormalStationaryState";
import { NormalWalkState } from "./NormalWalkState";
import { NormalJumpState } from "./NormalJumpState";
import { NormalJumpingState } from "./NormalJumpingState";
import { NormalFallState } from "./NormalFallState";
import { NormalPunchState } from "./NormalPunchState";
import { NormalGrabState } from "./NormalGrabState";
import { NormalSpecialState } from "./NormalSpecialState";

/**
 * Normal base state AI
 * - Initializes by normal state
 * @extends {UnderStateAI}
 * @classdesc Normal base state AI to initialize by normal state
 */
export class NormalBaseStateAI extends UnderStateAI {
    /**
     * Normal base state AI constructor
     * @constructor
     */
    constructor() {
        super('stationary');

        this.specialActionName = 'pray';
        this.namedStates['stationary'] = new NormalStationaryState(300, 36000);
        this.namedStates['walk'] = new NormalWalkState(300, 18000);
        this.namedStates['jump'] = new NormalJumpState(240);
        this.namedStates['walkjump'] = new NormalJumpState(320);
        this.namedStates['jumping'] = new NormalJumpingState(225, 12000);
        this.namedStates['fall'] = new NormalFallState(225, 12000);
        this.namedStates['falling'] = new NormalFallState(225, 12000);
        this.namedStates['attack'] = new NormalPunchState();
        this.namedStates['grab'] = new NormalGrabState(100, 30000);
        this.namedStates['grabwalk'] = new NormalGrabState(100, 15000);
        this.namedStates['pray'] = new NormalSpecialState();
    }
}
