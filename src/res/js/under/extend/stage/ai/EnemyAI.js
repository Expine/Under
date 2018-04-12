/**
 * Enemy AI
 * AI to control operation
 * @implements {StraightAI}
 * @classdesc Enemy AI to control operation
 */
class EnemyAI extends StraightAI { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        for (let it of this.entity.collider.collisions) {
            if ((it.e1 instanceof Player && it.nx * this.entity.body.velocityX < 0) || (it.e2 instanceof Player && it.nx * this.entity.body.velocityX > 0)) {
                let player = Util.getCollidedEntity(this.entity, it);
                player.damage(1);
            }
        }
        return super.apply(dt);
    }
}
