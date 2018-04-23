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
     * Load event image
     * @protected
     * @param {string} path Event image path
     * @return {number} Event image ID
     */
    loadEventImage(path) {
        return ResourceManager.image.load(`event/${path}`);
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
     * Make event
     * @protected
     * @param {JSON} event Event json data
     * @return {Event} Event
     */
    makeEvent(event) {
        if (event.type == `talk`) {
            return new TalkEvent(event.sentence);
        } else if (event.type == `waitkey`) {
            return new WaitKeyEvent();
        } else if (event.type == `image`) {
            return new ImageEvent(event.x, event.y, this.loadEventImage(event.file));
        }
    }

    /**
     * Make underlying entity
     * @protected
     * @param {number} x Entity x position
     * @param {number} y Entity Y position
     * @param {JSON} entity Entity information json data
     * @return {InfluentialEntity} Underlying entity
     */
    makeEntityBase(x, y, entity) {
        if (entity.type == `Player`) {
            return new Player(x, y, entity.width, entity.height, this.loadCharaImage(entity.file));
        } else if (entity.type == 'Enemy') {
            return new Enemy(x, y, entity.width, entity.height, this.loadCharaImage(entity.file));
        } else if (entity.type == `Obstacle`) {
            return new Obstacle(x, y, entity.width, entity.height, this.loadCharaImage(entity.file));
        } else if (entity.type == `Sign`) {
            return new SignObject(x, y, entity.width, entity.height, this.loadCharaImage(entity.file), this.loadCharaImage(entity.sign.file));
        } else if (entity.type == `Event`) {
            // TODO: Maybe separat event
            return new ImmutableEventObject(x, y, entity.width, entity.height, this.makeEvent(entity.event), this.loadCharaImage(entity.file));
        }
    }

    /**
     * Build character from json data
     * @override
     * @param {number} x Entity x position
     * @param {number} y Entity Y position
     * @param {JSON} json Character json data
     * @return {Entity} Generated character
     */
    build(x, y, json) {
        let base = this.makeEntityBase(x, y, json);
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
