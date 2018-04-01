/**
 * Generate character from json data
 * Has json data parsing
 * @extends {TileBuilder}
 * @classdesc Builder to generate character
 */
class CharacterBuilder extends TileBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make rigid body
     * @param {json} body Rigid body information json data
     * @return {RigidBody} RigidBody
     */
    makeBody(body) {
        if (body.type == `MaxAdopt`) {
            return new MaxAdoptBody();
        } else if (body.type == `Player`) {
            return new PlayerBody();
        }
    }

    /**
     * Make AI
     * @param {json} ai AI information json data
     * @param {json} animation AI animation json data
     * @return {AI} AI
     */
    makeAI(ai, animation) {
        let ret = eval(`new ${ai.name}()`);
        if (ret instanceof StateAI) {
            for (let name in animation) {
                if (animation.hasOwnProperty(name)) {
                    let target = ret.getStateByName(name);
                    if (target instanceof BaseState) {
                        target.setStateAnimaton(this.makeAnimation(animation[name]));
                    }
                }
            }
        }
        return ret;
    }

    /**
     * Make underlying entity
     * @protected
     * @param {number} x Entity x position
     * @param {number} y Entity y position
     * @param {json} entity Entity information json data
     * @return {Entity} Underlying entity
     */
    makeEntityBase(x, y, entity) {
        if (entity.type == `Player`) {
            return new Player(x, y, entity.width, entity.height, entity.file);
        } else if (entity.type == 'Enemy') {
            return new Enemy(x, y, entity.width, entity.height, entity.file);
        } else if (entity.type == `Obstacle`) {
            return new Obstacle(x, y, entity.width, entity.height, entity.file);
        }
    }

    /**
     * Build character from json data
     * @override
     * @param {number} x Entity x position
     * @param {number} y Entity y position
     * @param {json} json Character json data
     * @return {Entity} Generated character
     */
    build(x, y, json) {
        let base = this.makeEntityBase(x, y, json);
        base.setCollider(this.makeCollider(json.collider));
        base.setMaterial(this.makeMaterial(json.material));
        if (base instanceof MutableObject) {
            base.setRigidBody(this.makeBody(json.body));
        }
        if (json.ai !== undefined && base instanceof AutonomyObject) {
            for (let ai of json.ai) {
                base.addAI(this.makeAI(ai, json.state));
            }
        }
        if (json.animation !== undefined && BaseUtil.implementsOf(base, Animationable)) {
            base.setAnimation(this.makeAnimation(json.animation));
        }
        return base;
    }
}
