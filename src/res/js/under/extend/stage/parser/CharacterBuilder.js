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
     * Load character image
     * @protected
     * @param {string} path Character image path
     * @return {number} Character image ID
     */
    loadCharaImage(path) {
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
     * @return {AI} AI
     */
    makeAI(ai, animation) {
        switch (ai.type) {
            case `EnemyAI`:
                return new EnemyAI();
            case `StraightAI`:
                return new StraightAI();
            case `JumpAI`:
                return new JumpAI();
            case `ElevatorAI`:
                return new ElevatorAI();
            case `PlayerGameoverStateAI`:
                return new PlayerGameoverStateAI();
            case `PlayerBaseStateAI`:
                return new PlayerBaseStateAI();
            default:
                return null;
        }
    }

    /**
     * Process AI
     * @protected
     * @param {AI} ai Target AI
     * @param {JSON} animation AI animation json data
     */
    processAI(ai, animation) {
        if (ai instanceof StateAI) {
            for (let name in animation) {
                if (animation.hasOwnProperty(name)) {
                    let target = ai.getStateByName(name);
                    if (BaseUtil.implementsOf(target, IAnimationable)) {
                        target.setAnimaton(this.makeAnimation(animation[name]));
                    }
                }
            }
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
        let ret = null;
        switch (entity.type) {
            case `Player`:
                ret = new Player();
                break;
            case `Enemy`:
                ret = new Enemy();
                break;
            case `Obstacle`:
                ret = new Obstacle();
                break;
            case `Sign`:
                ret = new SignObject();
                let collider = this.makeCollider(deploy.collider);
                collider.setAABB(this.makeAABB(deploy.collider));
                ret.setSign(this.loadCharaImage(deploy.sign.file), collider);
                break;
            case `Elevator`:
                ret = new Elevator();
                break;
            case `Event`:
                ret = new ImmutableEventObject();
                break;
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

    /**
     * Build character from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     * @return {Entity} Generated character
     */
    build(deploy, json) {
        let base = this.makeEntityBase(deploy, json);
        if (base instanceof InfluentialEntity) {
            let collider = this.makeCollider(json.collider);
            if (collider != null) {
                collider.setAABB(this.makeAABB(json.collider));
            }
            base.setCollider(collider);
            base.setMaterial(this.makeMaterial(json.material));
        }
        if (base instanceof MutableEntity) {
            base.setRigidBody(this.makeBody(json.body));
            if (base.body != null) {
                base.body.setMaterial(this.makeBodyMaterial(json.body.material));
            }
        }
        if (json.ai !== undefined && base instanceof AutonomyEntitiy) {
            for (let ai of json.ai) {
                let attach = this.makeAI(ai);
                if (attach != null) {
                    this.processAI(attach, json.state);
                    base.addAI(attach);
                }
            }
        }
        if (json.animation !== undefined && BaseUtil.implementsOf(base, IAnimationable)) {
            base.setAnimation(this.makeAnimation(json.animation));
        }
        return base;
    }
}
