/**
 * Common none state
 * @implements {UnderPlayerState}
 * @classdesc Common none state fot transition to other state
 */
class CommonNoneState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Set entity for targeting
     * @param {AutonomyObject implements Damagable} entity Entity for tageting
     */
    setEntity(entity) {
        if (BaseUtil.implementsOf(entity, Damagable)) {
            super.setEntity(entity);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        if (this.entity.getHP() <= 0) {
            this.ai.changeState(`gameover`);
        }
        return false;
    }
}
