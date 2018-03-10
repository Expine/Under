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

        this.setCollider(new RectangleCollider(this, 0, 0, 64, 64, false));
    }

    /**
     * Check collisions and process if the object collides
     * @override
     */
    judgeCollision() {
        // If enemy is collided, damage and destroy
        for (let it of this.collider.collisions) {
            if (it.e1 instanceof Enemy) {
                it.e1.damage(1);
                this.destroy();
            }
            if (it.e2 instanceof Enemy) {
                it.e2.damage(1);
                this.destroy();
            }
        }
    }
}
