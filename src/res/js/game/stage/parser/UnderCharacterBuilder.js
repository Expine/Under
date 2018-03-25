/**
 * Generate under character from json data
 * Has json data parsing
 * @extends {CharacterBuilder}
 * @classdesc Builder to generate under character
 */
class UnderCharacterBuilder extends CharacterBuilder { // eslint-disable-line  no-unused-vars
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
