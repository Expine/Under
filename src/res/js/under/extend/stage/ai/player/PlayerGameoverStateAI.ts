import { NamedStateAI } from "../NamedStateAI";
import { PGameoverState } from "./PGameoverState";

/**
 * Player gameover state AI
 * - Manages gameover state
 * @extends {NamedStateAI}
 * @classdesc Player gameover state AI to manage gameover state
 */
export class PlayerGameoverStateAI extends NamedStateAI {
    /**
     * Player gameover state AI Constructor
     * @constructor
     */
    constructor() {
        super('gameover');

        this.namedStates['gameover'] = new PGameoverState();
    }
}
