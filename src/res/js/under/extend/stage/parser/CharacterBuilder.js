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
            default:
                return null;
        }
    }

    /**
     * Make AI
     * @protected
     * @param {JSON} ai AI information json data
     * @param {JSON} deploy AI deploy json data
     * @return {AI} AI
     */
    makeAI(ai, deploy) {
        switch (ai.type) {
            case `EnemyAI`:
                return new EnemyAI();
            case `StraightAI`:
                return new StraightAI();
            case `JumpAI`:
                return new JumpAI();
            case `ElevatorAI`:
                {
                    let v = (deploy === undefined || deploy.velocity === undefined) ? ai.velocity : deploy.velocity;
                    let p = (deploy === undefined || deploy.power === undefined) ? ai.power : deploy.power;
                    let floors = (deploy === undefined || deploy.floors === undefined) ? ai.floors : deploy.floors;
                    let ret = new ElevatorAI(v, p);
                    for (let it of floors) {
                        ret.addPosition(it.x, it.y);
                    }
                    return ret;
                }
            case `VanishStateAI`:
                {
                    let hide = (deploy === undefined || deploy.hide === undefined) ? ai.hide : deploy.hide;
                    let show = (deploy === undefined || deploy.show === undefined) ? ai.show : deploy.show;
                    let interval = (deploy === undefined || deploy.interval === undefined) ? ai.interval : deploy.interval;
                    return new VanishStateAI(hide, show, interval);
                }
            case `PlayerGameoverStateAI`:
                return new PlayerGameoverStateAI();
            case `PlayerBaseStateAI`:
                return new PlayerBaseStateAI();
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
                    let ret = new DoorObject(deploy.stage, deploy.replace, deploy.pop);
                    let collider = this.makeCollider(deploy.collider === undefined ? entity.collider : deploy.collider);
                    collider.setAABB(this.makeAABB(deploy.collider === undefined ? entity.collider : deploy.collider));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Sign`:
                {
                    let ret = new SignObject();
                    let collider = this.makeCollider(deploy.collider === undefined ? entity.collider : deploy.collider);
                    collider.setAABB(this.makeAABB(deploy.collider === undefined ? entity.collider : deploy.collider));
                    ret.setCollider(collider);
                    let signData = deploy.sign === undefined ? entity.sign : deploy.sign;
                    ret.setSign(this.imageBuilder.build(`event`, signData.image), signData.x, signData.y);
                    return ret;
                }
            case `Event`:
                {
                    let ret = new ImmutableEvent();
                    let collider = this.makeCollider(deploy.collider === undefined ? entity.collider : deploy.collider);
                    collider.setAABB(this.makeAABB(deploy.collider === undefined ? entity.collider : deploy.collider));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Attack`:
                return new AttackObject((deploy === undefined || deploy.life === undefined) ? entity.lifespan : deploy.lifespan);
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
        base.setRigidBody(this.makeBody(json.body));
        if (base.body != null) {
            base.body.enable = json.body.enable === undefined ? true : json.body.enable;
            base.body.setMaterial(this.makeBodyMaterial(json.body.material));
        }
    }

    /**
     * Build AI from json data
     * @protected
     * @param {AutonomyEntitiy} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildAI(base, deploy, json) {
        if (json.ai === undefined) {
            return;
        }
        for (let ai of json.ai) {
            base.addAI(this.makeAI(ai, deploy !== undefined ? deploy.ai : undefined));
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
        let base = this.makeEntityBase(deploy, json);
        this.buildBase(base, deploy, json);
        if (base instanceof ImagedEntity) {
            this.buildImage(base, deploy, json);
        }
        if (base instanceof InfluentialEntity) {
            this.buildPhysical(base, deploy, json);
        }
        if (base instanceof MutableEntity) {
            this.buildBody(base, deploy, json);
        }
        if (base instanceof AutonomyEntitiy) {
            this.buildAI(base, deploy, json);
        }
        return base;
    }
}
