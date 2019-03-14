/**
 * Colliderable interface
 * - ### Object that has collide
 * @interface
 * @classdesc Colliderable interface that has collider
 */
class IColliderable extends Interface {
    /**
     * Get collider
     * @abstract
     * @return {Collider} Collider that object has
     */
    getCollider() {}
}
