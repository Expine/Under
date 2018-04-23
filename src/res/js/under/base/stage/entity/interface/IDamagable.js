/**
 * Damageable interface
 * - Object that can be destroyed
 * - ### Object that can be damaged
 * @interface
 * @implements {Breakable}
 * @classdesc Damagable interface that can be damaged
 */
class IDamagable extends IBreakable { // eslint-disable-line  no-unused-vars
    /**
     * Get hit point
     * @abstract
     * @return {number} Hit point
     */
    getHP() {}

    /**
     * Damage object
     * @abstract
     * @param {number} damage Amount of damage
     */
    damage(damage) {}
}
