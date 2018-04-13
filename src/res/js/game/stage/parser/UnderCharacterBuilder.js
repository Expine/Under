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
     * Make AI
     * @override
     * @protected
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
                    if (target === undefined) {
                        target = new NormalNoneState();
                        ret.setState(target, name);
                    }
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
     * @override
     * @protected
     * @param {number} x Entity x position
     * @param {number} y Entity Y position
     * @param {json} entity Entity information json data
     * @return {InfluentialEntity} Underlying entity
     */
    makeEntityBase(x, y, entity) {
        if (entity.type == `Player`) {
            return new UnderPlayer(x, y, entity.width, entity.height, entity.file);
        }
        return super.makeEntityBase(x, y, entity);
    }
}
