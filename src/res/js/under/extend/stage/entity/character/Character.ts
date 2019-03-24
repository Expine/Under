import { AIListedObject } from "../AIListedObject";
import { IDamagable } from "../../../../base/stage/entity/interface/IDamagable";

/**
 * Character
 * - Implements damagable and animationable
 * @extends {AIListedObject}
 * @implements {IDamagable}
 * @classdesc Character that implements damagable and animationable
 */
export class Character extends AIListedObject implements IDamagable {
    /**
     * Hit point
     * @protected
     * @type {number}
     */
    protected hp: number;

    /**
     * Character constructor
     * @constructor
     */
    constructor() {
        super();
        this.hp = 0;
    }

    /**
     * Set hit point
     * @param {number} hp Hit point
     */
    setHP(hp: number) {
        this.hp = hp;
    }

    /**
     * Get hit point
     * @override
     * @return {number} Hit point
     */
    getHP(): number {
        return this.hp;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage: number) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.destroy();
        }
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        if (this.stage !== null) {
            this.stage.removeEntity(this);
        }
    }
}
