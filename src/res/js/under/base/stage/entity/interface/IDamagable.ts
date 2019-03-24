import { IBreakable } from "./IBreakable";

/**
 * Damageable interface
 * - Object that can be damaged
 * @interface
 * @extends {IBreakable}
 * @classdesc Damagable interface that can be damaged
 */
export interface IDamagable extends IBreakable {
    /**
     * Get hit point
     * @abstract
     * @return {number} Hit point
     */
    getHP(): number;

    /**
     * Damage object
     * @abstract
     * @param {number} damage Amount of damage
     */
    damage(damage: number): void;
}

/**
 * Type guard for IDamagable
 */
export const isIDamagable = (arg: any): arg is IDamagable => arg !== null && arg.damage !== undefined;
