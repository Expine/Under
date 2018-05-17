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
     * Make rigid body
     * @protected
     * @param {JSON} body Rigid body information json data
     * @return {RigidBody} Rigid body
     */
    makeBody(body) {
        switch (body.type) {
            case `String`:
                return new StringBody(this.makeBody(body.body), body.x, body.y, body.length, body.k, body.count);
            default:
                return super.makeBody(body);
        }
    }

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
     * @return {AI} AI
     */
    makeAI(ai) {
        switch (ai.type) {
            case `CommonBaseStateAI`:
                return new CommonBaseStateAI();
            case `NormalBaseStateAI`:
                return new NormalBaseStateAI();
            case `WildBaseStateAI`:
                return new WildBaseStateAI();
            case `AdventurerBaseStateAI`:
                return new AdventurerBaseStateAI();
            case `PropellerBaseStateAI`:
                return new PropellerBaseStateAI();
            default:
                return super.makeAI(ai);
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
            case `HookHead`:
                return new HookHead(this.tryReplace(deploy, entity, `max`), this.tryReplace(deploy, entity, `hook`), this.tryReplace(deploy, entity, `child`));
            case `HookChild`:
                return new HookChild();
            case `Sign`:
                {
                    let signData = this.tryReplace(deploy, entity, `sign`);
                    if (signData.image !== undefined) {
                        return super.makeEntityBase(deploy, entity);
                    }
                    let ret = new TextSignObject();
                    let colliderData = this.tryReplace(deploy, entity, `collider`);
                    let collider = this.makeCollider(colliderData);
                    collider.setAABB(this.makeAABB(colliderData));
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
