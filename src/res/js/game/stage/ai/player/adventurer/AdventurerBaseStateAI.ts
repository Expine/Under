import { NormalBaseStateAI } from "../normal/NormalBaseStateAI";
import { isIMovableState } from "../../IMovableState";
import { isIPrepareState } from "../../IPrepareState";
import { AdventurerDownWallState } from "./AdventurerDownWallState";
import { AdventurerStationaryState } from "./AdventurerStationaryState";
import { AdventurerWalkState } from "./AdventurerWalkState";
import { AdventurerGrabState } from "./AdventurerGrabState";
import { AdventurerJumpingState } from "./AdventurerJumpingState";
import { AdventurerFallState } from "./AdventurerFallState";
import { AdventurerHookState } from "./AdventurerHookState";

/**
 * Adventurer base State AI
 * - Initializes by adventurer state
 * @extends {NormalBaseStateAI}
 * @classdesc Adventurer base state AI to initialize by adventurer state
 */
export class AdventurerBaseStateAI extends NormalBaseStateAI {
    /**
     * Adventurer base State AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = 'hook';
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const state = this.namedStates[name];
                if (isIMovableState(state)) {
                    state.setMaxVelocity(state.getMaxVX() * 7 / 6, state.getMaxVY() * 7 / 6);
                    state.setMovePower(state.getMovePX() * 7 / 6, state.getMovePY() * 7 / 6);
                }
                if (isIPrepareState(state)) {
                    state.setSpeedMagnification(state.getSpeedMagnification() * 3);
                    state.setAppliedPower(state.getAppliedPower() * 5 / 4);
                }
            }
        }
        this.namedStates['stationary'] = new AdventurerStationaryState(350, 42000);
        this.namedStates['walk'] = new AdventurerWalkState(350, 21000);
        this.namedStates['grab'] = new AdventurerGrabState(110, 30000);
        this.namedStates['jumping'] = new AdventurerJumpingState(262.5, 14000);
        this.namedStates['fall'] = new AdventurerFallState(250, 15000);
        this.namedStates['falling'] = new AdventurerFallState(250, 15000);
        this.namedStates['hook'] = new AdventurerHookState();
        this.namedStates['downwall'] = new AdventurerDownWallState(250, 15000);
    }
}
