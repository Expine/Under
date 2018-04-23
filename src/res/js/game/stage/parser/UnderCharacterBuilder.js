/**
 * Under character builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - Generate not tile but mutable entity from json data
 * - ### Gemerates under player
 * - ### Automatically sets normal none state
 * @extends {CharacterBuilder}
 * @classdesc Under character builder to generate under player and sets normal none state automatically
 */
class UnderCharacterBuilder extends CharacterBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make base collider
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {Collider} Collider
     */
    makeBaseCollider(collider) {
        if (collider.excluded) {
            if (collider.type == `Rectangle`) {
                return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
            } else if (collider.type == `RoundRectangle`) {
                return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
            }
        } else {
            return super.makeBaseCollider(collider);
        }
    }

    /**
     * Make AI
     * @override
     * @protected
     * @param {JSON} ai AI information json data
     * @param {JSON} animation AI animation json data
     * @return {AI} AI
     */
    makeAI(ai, animation) {
        let ret = eval(`new ${ai.name}()`);
        if (ret instanceof StateAI) {
            for (let name in animation) {
                if (animation.hasOwnProperty(name)) {
                    let target = ret.getStateByID(name);
                    if (target === undefined) {
                        target = new NormalNoneState();
                        ret.setState(target, name);
                    }
                    if (BaseUtil.implementsOf(target, IAnimationable)) {
                        target.setAnimation(this.makeAnimation(animation[name]));
                    }
                }
            }
        }
        return ret;
    }

    /**
     * Make underlying entity
     * @override
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} entity Entity information json data
     * @return {InfluentialEntity} Underlying entity
     */
    makeEntityBase(deploy, entity) {
        if (entity.type == `Player`) {
            return new UnderPlayer(deploy.x, deploy.y, entity.width, entity.height, this.loadCharaImage(entity.file));
        }
        return super.makeEntityBase(deploy, entity);
    }
}
