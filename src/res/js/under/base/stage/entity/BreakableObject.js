/**
 * Breakable object
 * Object that can be damaged
 * And can be destroyed
 * @implements {AutonomyObject}
 * @classdesc Breakable object that can be damaged and destroyed
 */
class BreakableObject extends AutonomyObject { // eslint-disable-line  no-unused-vars
    /**
     * Get hit point
     * @interface
     * @return {number} Hit point
     */
    getHP() {}

    /**
     * Dameg object
     * @interface
     * @param {number} damage Amount of damage
     */
    damage(damage) {}

    /**
     * Destroy object
     * @interface
     */
    destroy() {}
}
