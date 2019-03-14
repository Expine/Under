/**
 * Player gameover state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Manages gameover state
 * @extends {NamedStateAI}
 * @classdesc Player gameover state AI to manage gameover state
 */
class PlayerGameoverStateAI extends NamedStateAI {
    /**
     * Player gameover state AI Constructor
     * @constructor
     */
    constructor() {
        super(`gameover`);

        this.namedStates[`gameover`] = new PGameoverState();
    }
}
