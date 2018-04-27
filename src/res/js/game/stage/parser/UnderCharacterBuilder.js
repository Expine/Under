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
     * Make collider
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider) {
        if (collider.excluded) {
            switch (collider.type) {
                case `Rectangle`:
                    return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                case `RoundRectangle`:
                    return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
            }
        }
        return super.makeCollider(collider);
    }

    /**
     * Make AI
     * @override
     * @protected
     * @param {JSON} ai AI information json data
     * @param {JSON} deploy AI deploy json data
     * @return {AI} AI
     */
    makeAI(ai, deploy) {
        let ret = null;
        switch (ai.type) {
            case `CommonBaseStateAI`:
                ret = new CommonBaseStateAI();
                break;
            case `NormalBaseStateAI`:
                ret = new NormalBaseStateAI();
                break;
            default:
                ret = super.makeAI(ai, deploy);
                break;
        }
        return ret;
    }

    /**
     * Process AI
     * @override
     * @protected
     * @param {AI} ai Target AI
     * @param {JSON} animation AI animation json data
     * @return {AI} Processed AI
     */
    processAI(ai, animation) {
        if (ai instanceof StateAI) {
            for (let name in animation) {
                if (animation.hasOwnProperty(name)) {
                    let target = ai.getStateByID(name);
                    if (target === undefined) {
                        target = new NormalNoneState();
                        ai.setState(target, name);
                    }
                    if (BaseUtil.implementsOf(target, IAnimationable)) {
                        target.setAnimation(this.makeAnimation(animation[name]));
                    }
                }
            }
        }
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
        let ret = null;
        let collider = null;
        switch (entity.type) {
            case `Player`:
                ret = new UnderPlayer();
                break;
            case `Sign`:
                let signData = deploy.sign === undefined ? entity.sign : deploy.sign;
                if (signData.file !== undefined) {
                    return super.makeEntityBase(deploy, entity);
                } else {
                    ret = new TextSignObject();
                }
                collider = this.makeCollider(deploy.collider === undefined ? entity.collider : deploy.collider);
                collider.setAABB(this.makeAABB(deploy.collider === undefined ? entity.collider : deploy.collider));
                ret.setCollider(collider);
                ret.setSign(signData.x, signData.y, signData.size, signData.text);
                break;
            default:
                return super.makeEntityBase(deploy, entity);
        }
        if (ret != null) {
            ret.setPosition(deploy.x, deploy.y, deploy.z);
            ret.setSize(entity.width, entity.height);
            if (ret instanceof ImagedEntity) {
                ret.setImage(this.loadCharaImage(entity.file));
            }
        }
        return ret;
    }
}
