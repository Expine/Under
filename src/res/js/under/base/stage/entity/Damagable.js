/**
 * Damageable interface
 * Object that can be damaged
 * And can be destroyed
 * @implements {Breakable}
 * @classdesc Damagable interface that can be damaged and destroyed
 */
class Damagable extends Breakable { // eslint-disable-line  no-unused-vars
    /**
     * Damagable constructor
     * @constructor
     */
    constructor() {
        super();
        this.addMethod(this.getHP);
        this.addMethod(this.damage);
    }
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
