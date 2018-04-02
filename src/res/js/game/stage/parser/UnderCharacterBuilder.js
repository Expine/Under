/**
 * Generate under character from json data
 * Has json data parsing
 * @extends {CharacterBuilder}
 * @classdesc Builder to generate under character
 */
class UnderCharacterBuilder extends CharacterBuilder { // eslint-disable-line  no-unused-vars
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
     * @param {number} y Entity y position
     * @param {json} entity Entity information json data
     * @return {Entity} Underlying entity
     */
    makeEntityBase(x, y, entity) {
        if (entity.type == `Player`) {
            return new UnderPlayer(x, y, entity.width, entity.height, entity.file);
        }
        return super.makeEntityBase(x, y, entity);
    }
}
