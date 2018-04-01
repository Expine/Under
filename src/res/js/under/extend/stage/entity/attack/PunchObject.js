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
     * @param {number} width object width
     * @param {number} height object height
     * @param {Entity} entity Attacker entity
     */
    constructor(x, y, width, height, entity) {
        super(x, y, width, height, entity, -1, 400);

        // set base data
        let imageID = ContextImage.it.loadImage(`chara/attack.png`);
        let anime = new SingleAnimation();
        anime.addAnimation(new AnimationElement(imageID, 0, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 32, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 64, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 96, 0, 32, 32, 100));
        this.setAnimation(anime);
        this.setCollider(new RectangleCollider(0, 0, this.width, this.height));
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
            let entity = Util.getCollidedEntity(this.entity, it);
            if (this.entity !== entity && BaseUtil.implementsOf(entity, Damagable)) {
                entity.damage(1);
                ret = true;
            }
        }
        // If enemy is collided, destroy
        if (ret) {
            // this.destroy();
        }
        return ret;
    }
}
