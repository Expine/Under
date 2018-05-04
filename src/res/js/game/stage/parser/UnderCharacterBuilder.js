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
        switch (ai.type) {
            case `CommonBaseStateAI`:
                return new CommonBaseStateAI();
                break;
            case `NormalBaseStateAI`:
                return new NormalBaseStateAI();
                break;
            default:
                return super.makeAI(ai, deploy);
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
        switch (entity.type) {
            case `Player`:
                return new UnderPlayer();
            case `Sign`:
                {
                    let signData = deploy.sign === undefined ? entity.sign : deploy.sign;
                    let ret = null;
                    if (signData.file !== undefined) {
                        return super.makeEntityBase(deploy, entity);
                    } else {
                        ret = new TextSignObject();
                    }
                    let collider = this.makeCollider(deploy.collider === undefined ? entity.collider : deploy.collider);
                    collider.setAABB(this.makeAABB(deploy.collider === undefined ? entity.collider : deploy.collider));
                    ret.setCollider(collider);
                    ret.setSign(signData.x, signData.y, signData.size, signData.text);
                    return ret;
                }
                break;
            default:
                return super.makeEntityBase(deploy, entity);
        }
    }
}
