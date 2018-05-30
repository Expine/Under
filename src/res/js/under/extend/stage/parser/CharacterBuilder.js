/**
 * Character builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - ### Generate not tile but mutable entity from json data
 * @extends {TileBuilder}
 * @classdesc Character builder to generate mutable entity
 */
class CharacterBuilder extends TileBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make image
     * @override
     * @protected
     * @param {JSON} image Entity information json data
     * @return {GameImage} Image
     */
    makeImage(image) {
        return this.imageBuilder.build(`chara`, image);
    }

    /**
     * Make rigid body
     * @protected
     * @param {JSON} body Rigid body information json data
     * @return {RigidBody} Rigid body
     */
    makeBody(body) {
        switch (body.type) {
            case `MaxAdopt`:
                return new MaxAdoptBody();
            case `Precise`:
                return new PreciseBody();
            case `Player`:
                return new PlayerBody();
            default:
                return null;
        }
    }

    /**
     * Make rigid body material
     * @protected
     * @param {JSON} material Rigid body material
     * @return {RigidBodyMaterial} Rigid body material
     */
    makeBodyMaterial(material) {
        switch (material.type) {
            case `Immutable`:
                return new ImmutableRigidMaterial(material.k, material.frictionX, material.frictionY, material.g);
            case `Mutable`:
                return new MutableRigidMaterial(material.k, material.frictionX, material.frictionY, material.g);
            default:
                return null;
        }
    }

    /**
     * Make AI
     * @protected
     * @param {JSON} ai AI information json data
     * @return {AI} AI
     */
    makeAI(ai) {
        switch (ai.type) {
            case `EnemyAI`:
                return new EnemyAI(this.makeAI(ai.ai));
            case `StraightAI`:
                return new StraightAI(ai.mvx, ai.px);
            case `JumpAI`:
                return new JumpAI(ai.jump);
            case `ElevatorAI`:
                {
                    const ret = new ElevatorAI(ai.velocity, ai.power);
                    for (const it of ai.floors) {
                        ret.addPosition(it.x, it.y);
                    }
                    return ret;
                }
            case `VanishStateAI`:
                return new VanishStateAI(ai.hide, ai.show, ai.interval);
            case `PlayerGameoverStateAI`:
                return new PlayerGameoverStateAI();
            case `PlayerBaseStateAI`:
                return new PlayerBaseStateAI();
            case `AttackObjectAI`:
                return new AttackObjectAI();
            case `StraightAttackAI`:
                return new StraightAttackAI(ai.vx === undefined ? 0 : ai.vx, ai.vy === undefined ? 0 : ai.vy, ai.px === undefined ? 0 : ai.px, ai.py === undefined ? 0 : ai.py);
            default:
                return null;
        }
    }

    /**
     * Make underlying entity
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} entity Entity information json data
     * @return {Entity} Underlying entity
     */
    makeEntityBase(deploy, entity) {
        switch (entity.type) {
            case `OnlyImage`:
                return new OnlyImageEntity();
            case `AIObject`:
                return new AIListedObject();
            case `Character`:
                return new Character();
            case `StateCharacter`:
                return new StateCharacter();
            case `Player`:
                return new Player();
            case `Enemy`:
                return new Enemy();
            case `Obstacle`:
                return new Obstacle();
            case `Door`:
                {
                    const ret = new DoorObject(deploy.stage, deploy.replace, deploy.pop);
                    const colliderData = this.trDyReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Sign`:
                {
                    const ret = new SignObject();
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    const signData = this.tryReplace(deploy, entity, `sign`);
                    ret.setSign(this.imageBuilder.build(`event`, signData.image), signData.x, signData.y);
                    return ret;
                }
            case `Event`:
                {
                    const once = this.tryReplace(deploy, entity, `once`);
                    const ret = once ? new OnceEventEntity() : new ImmutableEvent();
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Attack`:
                return new AttackObject(this.tryReplace(deploy, entity, `lifespan`));
            default:
                return null;
        }
    }

    /**
     * Build phsical body from json data
     * @protected
     * @param {MutableEntity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildBody(base, deploy, json) {
        const bodyData = this.tryReplace(deploy, json, `body`);
        base.setRigidBody(this.makeBody(bodyData));
        if (base.body !== null) {
            base.body.enable = bodyData.enable === undefined ? true : bodyData.enable;
            base.body.setMaterial(this.makeBodyMaterial(bodyData.material));
        }
    }

    /**
     * Build AI from json data
     * @protected
     * @param {AutonomyEntity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildAI(base, deploy, json) {
        const aiData = [];
        if (json.ai !== undefined) {
            for (const it of json.ai) {
                aiData.push(it);
            }
        }
        if (deploy !== undefined && deploy.ai !== undefined) {
            for (const it of deploy.ai) {
                const index = aiData.findIndex((v) => v.type === it.type);
                if (index >= 0) {
                    for (const item in it) {
                        if (it.hasOwnProperty(item)) {
                            aiData[index][item] = it[item];
                        }
                    }
                } else {
                    aiData.push(it);
                }
            }
        }
        for (const ai of aiData) {
            base.addAI(this.makeAI(ai));
        }
    }

    /**
     * Build owner by json data
     * @protected
     * @param {IOwned} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildOwner(base, deploy, json) {
        if (deploy !== undefined && deploy.owner !== undefined) {
            base.setOwner(deploy.owner);
        }
    }

    /**
     * Build character from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     * @return {Entity} Generated character
     */
    build(deploy, json) {
        const base = this.makeEntityBase(deploy, json);
        this.buildBase(base, deploy, json);
        if (BaseUtil.implementsOf(base, IOwned)) {
            this.buildOwner(base, deploy, json);
        }
        if (base instanceof ImagedEntity) {
            this.buildImage(base, deploy, json);
        }
        if (base instanceof InfluentialEntity) {
            this.buildPhysical(base, deploy, json);
        }
        if (base instanceof MutableEntity) {
            this.buildBody(base, deploy, json);
        }
        if (base instanceof AutonomyEntity) {
            this.buildAI(base, deploy, json);
        }
        return base;
    }
}
