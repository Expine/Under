/**
 * Convenient method group
 * @classdesc Convenient method group
 */
class Util { // eslint-disable-line  no-unused-vars
    /**
     * Determine whether entity is on the ground
     * @param {InfluentialEntity} entity Target entity
     * @return {bool} Whether entity is on the ground
     */
    static onGround(entity) {
        return this.getUnderEntity(entity) != null;
    }

    /**
     * Get under entity
     * @param {InfluentialEntity} entity Target entity
     * @return {InfluentialEntity} Under entity (if not, return null)
     */
    static getUnderEntity(entity) {
        let data = entity.collider.collisions.find((it) => {
            return ((it.e1 === entity && it.ny > 0) || (it.e2 === entity && it.ny < 0)) && it.e1.collider.isResponse(it.e2.collider) && it.e2.collider.isResponse(it.e1.collider);
        });
        return data === undefined ? null : this.getCollidedEntity(entity, data);
    }

    /**
     * Get collided entity
     * @param {InfluentialEntity} entity Target entity
     * @return {InfluentialEntity} Under entity (if not, return null)
     */
    static getSideEntity(entity) {
        let list = entity.collider.collisions;
        for (let it of list) {
            if (it.ny != 0) {
                continue;
            }
            let dot = entity.body.velocityX * it.nx + entity.body.velocityY * it.ny;
            if ((it.e1 === entity && dot > 0) || (it.e2 === entity && dot < 0)) {
                return this.getCollidedEntity(entity, it);
            }
        }
        return null;
    }

    /**
     * Get entity from collision data
     * @param {InfluentialEntity} self Entity itself
     * @param {CollisionData} data Collision data
     * @return {Entity} Collided entity
     */
    static getCollidedEntity(self, data) {
        return data.e1 === self ? data.e2 : data.e1;
    }

    /**
     * Load text file
     * @param {string} filePath File path
     * @return {string} Loaded text
     */
    static loadFile(filePath) {
        let req = new XMLHttpRequest();
        req.open(`GET`, filePath, false);
        req.send(null);
        return req.responseText;
    }
}
