/**
 * Punch object
 * Object indicating punch attack
 * @implements {AttackObject}
 * @classdesc Punch object indicating punch attack
 */
class PunchObject extends AttackObject { // eslint-disable-line  no-unused-vars
    /**
     * Punch object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     */
    constructor(x, y) {
        super(x, y, 64, 64, -1, 300);

        // TODO: Put this process out
        this.setCollider(new RectangleCollider(0, 0, 64, 64));
    }

    /**
     * Check collisions and process if the object collides
     * @protected
     * @override
     * @return {bool} Collision or not
     */
    judgeCollision() {
        let ret = false;
        // If damageable object is collided, damage
        for (let it of this.collider.collisions) {
            let entity = Util.getCollidedEntity(this, it);
            if (BaseUtil.implementsOf(entity, Damagable)) {
                entity.damage(1);
                ret = true;
            }
        }
        // If enemy is collided, destroy
        if (ret) {
            this.destroy();
        }
        return ret;
    }
}
