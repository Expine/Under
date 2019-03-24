import { Character } from "./Character";

/**
 * Enemy
 * - Entity operated as the enemy
 * @implements {Character}
 * @classdesc Enemy to be operated as the enemy
 */
export class Enemy extends Character {
    /**
     * Enemy constructor
     * @constructor
     */
    constructor() {
        super();

        // initialize
        this.setHP(1);
        this.setDirection(1);
    }
}
