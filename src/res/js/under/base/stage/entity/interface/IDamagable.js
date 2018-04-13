/**
 * Damageable interface
 * - Object that can be destroyed
 * - ### Object that can be damaged
 * @implements {Breakable}
 * @classdesc Damagable interface that can be damaged
 */
class IDamagable extends IBreakable { // eslint-disable-line  no-unused-vars
    /**
     * Get hit point
     * @interface
     * @return {number} Hit point
     */
    getHP() {}

    /**
     * Damage object
     * @interface
     * @param {number} damage Amount of damage
     */
    damage(damage) {}
}
