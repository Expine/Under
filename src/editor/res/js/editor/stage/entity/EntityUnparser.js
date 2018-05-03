// TODO: Should be implement by Inheritance
/**
 * Entity unparser
 * - ### Unparses from entity to json
 * @classdesc Entity unparser to unparse from entity to json
 */
class EntityUnparser { // eslint-disable-line  no-unused-vars
    /**
     * Unparses from entity to json
     * @protected
     * @param {JSON} base Base entity json data
     * @param {Entity} entity Entity to unparse
     * @param {JSON} original Original json data
     */
    unparseTile(base, entity, original) {

    }

    /**
     * Unparses from deployer to json
     * @protected
     * @param {JSON} base Base deployer json data
     * @param {Entity} entity Entity to unparse
     * @param {JSON} original Original json data
     */
    unparseDeployer(base, entity, original) {
        base.z = entity.z;
    }

    /**
     * Unparses from entity to json
     * @param {Entity} entity Entity to unparse
     * @param {JSON} original Original json data
     * @return {JSON} Json data
     */
    unparse(entity, original) {
        let ret = {};
        ret.id = original.id;
        // set position
        ret.x = entity.x;
        ret.y = entity.y;
        if (entity instanceof TileObject) {
            this.unparseTile(ret, entity, original);
        } else {
            this.unparseDeployer(ret, entity, original);
        }
        return ret;
    }
}
