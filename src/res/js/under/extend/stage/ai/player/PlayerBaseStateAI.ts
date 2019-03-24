import { NamedStateAI } from "../NamedStateAI";
import { PStationaryState } from "./PStationaryState";
import { PWalkState } from "./PWalkState";
import { PJumpState } from "./PJumpState";
import { PJumpingState } from "./PJumpingState";
import { PPunchState } from "./PPunchState";

/**
 * Player base State AI
 * - Manages player state
 * @extends {NamedStateAI}
 * @classdesc Player base State AI to manage player state
 */
export class PlayerBaseStateAI extends NamedStateAI {
    /**
     * Player base State AI Constructor
     * @constructor
     */
    constructor() {
        super(`stationary`);

        this.namedStates[`stationary`] = new PStationaryState(300, 36000);
        this.namedStates[`walk`] = new PWalkState(300, 18000);
        this.namedStates[`jump`] = new PJumpState(230);
        this.namedStates[`walkjump`] = new PJumpState(300);
        this.namedStates[`jumping`] = new PJumpingState(200, 12000);
        this.namedStates[`attack`] = new PPunchState();
    }
}
