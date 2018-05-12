/**
 * Enemy AI
 * - Determines the behavior of an entity
 * - ### Damages to the collided opponent
 * @extends {StraightAI}
 * @classdesc Enemy AI to damage to the conflicting opponent
 */
class EnemyAI extends StraightAI { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        for (let it of this.entity.collider.collisions) {
            let opponent = Util.getSideEntity(this.entity, it);
            if (opponent !== null && BaseUtil.implementsOf(opponent, IDamagable)) {
                opponent.damage(1);
            }
        }
        return super.apply(dt);
    }
}
