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
        let ret = null;
        if (body.type == `MaxAdopt`) {
            ret = new MaxAdoptBody();
        } else if (body.type == `Precise`) {
            ret = new PreciseBody();
        } else if (body.type == `Player`) {
            ret = new PlayerBody();
        }
        if (ret != null) {
            ret.setMaterial(this.makeBodyMaterial(body.material));
        }
        return ret;
    }

    /**
     * Make rigid body material
     * @protected
     * @param {JSON} material Rigid body material
     * @return {RigidBodyMaterial} Rigid body material
     */
    makeBodyMaterial(material) {
        if (material.type == `Immutable`) {
            return new ImmutableRigidMaterial(material.k, material.frictionX, material.frictionY);
        }
        return null;
    }

    /**
     * Make AI
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
                    let target = ret.getStateByName(name);
                    if (BaseUtil.implementsOf(target, IAnimationable)) {
                        target.setAnimaton(this.makeAnimation(animation[name]));
                    }
                }
            }
        }
        return ret;
    }

    /**
     * Make underlying entity
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} entity Entity information json data
     * @return {InfluentialEntity} Underlying entity
     */
    makeEntityBase(deploy, entity) {
        if (entity.type == `Player`) {
            return new Player(deploy.x, deploy.y, entity.width, entity.height, this.loadCharaImage(entity.file));
        } else if (entity.type == 'Enemy') {
            return new Enemy(deploy.x, deploy.y, entity.width, entity.height, this.loadCharaImage(entity.file));
        } else if (entity.type == `Obstacle`) {
            return new Obstacle(deploy.x, deploy.y, entity.width, entity.height, this.loadCharaImage(entity.file));
        } else if (entity.type == `Sign`) {
            return new SignObject(deploy.x, deploy.y, entity.width, entity.height, this.loadCharaImage(entity.file), this.loadCharaImage(entity.sign.file));
        } else if (entity.type == `Event`) {
            return new ImmutableEventObject(deploy.x, deploy.y, entity.width, entity.height, this.loadCharaImage(entity.file));
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
        base.setCollider(this.makeCollider(json.collider));
        base.setMaterial(this.makeMaterial(json.material));
        if (base instanceof MutableEntity) {
            base.setRigidBody(this.makeBody(json.body));
        }
        if (json.ai !== undefined && base instanceof AutonomyEntitiy) {
            for (let ai of json.ai) {
                base.addAI(this.makeAI(ai, json.state));
            }
        }
        if (json.animation !== undefined && BaseUtil.implementsOf(base, IAnimationable)) {
            base.setAnimation(this.makeAnimation(json.animation));
        }
        return base;
    }
}
