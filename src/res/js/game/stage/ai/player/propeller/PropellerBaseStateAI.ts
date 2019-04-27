import { NormalBaseStateAI } from "../normal/NormalBaseStateAI";
import { isIMovableState } from "../../IMovableState";
import { isIPrepareState } from "../../IPrepareState";
import { PropellerJumpingState } from "./PropellerJumpingState";

/**
 * Propeller base state AI
 * - Initializes by propeller state
 * @extends {NormalBaseStateAI}
 * @classdesc Propeller base state AI to initialize by propeller state
 */
export class PropellerBaseStateAI extends NormalBaseStateAI {
    /**
     * Propeller base state AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = 'none';
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const state = this.namedStates[name];
                if (isIMovableState(state)) {
                    state.setMaxVelocity(state.getMaxVX() * 7 / 6, state.getMaxVY() * 7 / 6);
                    state.setMovePower(state.getMovePX() * 7 / 6, state.getMovePY() * 7 / 6);
                }
                if (isIPrepareState(state)) {
                    state.setAppliedPower(state.getAppliedPower() * 2);
                }
            }
        }
        this.namedStates['jumping'] = new PropellerJumpingState(350, 500, 21000, 30000);
    }
}
