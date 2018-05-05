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
     * Load image
     * @override
     * @protected
     * @param {string} path Image file name
     * @return {number} Image ID
     */
    loadImage(path) {
        return ResourceManager.image.load(`chara/${path}`);
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
                let ret = new ElevatorAI();
                for (let it of deploy.floors) {
                    ret.addPosition(it.x, it.y);
                }
                return ret;
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
     * @return {InfluentialEntity} Underlying entity
     */
    makeEntityBase(deploy, entity) {
        switch (entity.type) {
            case `Player`:
                return new Player();
                break;
            case `Enemy`:
                return new Enemy();
                break;
            case `Obstacle`:
                return new Obstacle();
                break;
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
                    ret.setSign(signData.x, signData.y, signData.width, signData.height, this.loadCharaImage(signData.file));
                    return ret;
                }
            case `Elevator`:
                return new Elevator();
            case `Event`:
                {
                    let ret = new ImmutableEvent();
                    let collider = this.makeCollider(deploy.collider === undefined ? entity.collider : deploy.collider);
                    collider.setAABB(this.makeAABB(deploy.collider === undefined ? entity.collider : deploy.collider));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Vanish`:
                return new VanishTileObject(deploy.show, deploy.hide);
            default:
                return null;
        }
    }

    /**
     * Build phsical body from json data
     * @protected
     * @param {Entity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildBody(base, deploy, json) {
        base.setRigidBody(this.makeBody(json.body));
        if (base.body != null) {
            base.body.setMaterial(this.makeBodyMaterial(json.body.material));
        }
    }

    /**
     * Build AI from json data
     * @protected
     * @param {Entity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildAI(base, deploy, json) {
        if (json.ai === undefined) {
            return;
        }
        for (let ai of json.ai) {
            base.addAI(this.makeAI(ai, deploy.ai));
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
        // set physical parameter
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
