import { NormalBaseStateAI } from "../normal/NormalBaseStateAI";
import { isIMovableState } from "../../IMovableState";
import { isIPrepareState } from "../../IPrepareState";
import { WildClawState } from "./WildClawState";
import { WildRollState } from "./WildRollState";
import { WildRollingState } from "./WildRollingState";

/**
 * Wild base state AI
 * - Initializes by wild state
 * @extends {NormalBaseStateAI}
 * @classdesc Wild base state AI to initialize by wild state
 */
export class WildBaseStateAI extends NormalBaseStateAI {
    /**
     * Wild base state AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = 'roll';
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const state = this.namedStates[name];
                if (isIMovableState(state)) {
                    state.setMaxVelocity(state.getMaxVX() * 4 / 3, state.getMaxVY() * 4 / 3);
                    state.setMovePower(state.getMovePX() * 5 / 4, state.getMovePY() * 5 / 3);
                }
                if (isIPrepareState(state)) {
                    state.setSpeedMagnification(state.getSpeedMagnification() * 5);
                    state.setAppliedPower(state.getAppliedPower() * 3 / 2);
                }
            }
        }

        this.namedStates['attack'] = new WildClawState();
        this.namedStates['roll'] = new WildRollState(880000, 240000);
        this.namedStates['rolling'] = new WildRollingState();
    }
}
