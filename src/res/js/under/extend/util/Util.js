/**
 * Convenient method group
 * @classdesc Convenient method group
 */
class Util { // eslint-disable-line  no-unused-vars
    /**
     * Determine whether entity is on the ground
     * @param {Entity} entity Target entity
     * @return {bool} Whether entity is on the ground
     */
    static onGround(entity) {
        let list = entity.collider.collisions;
        for (let it of list) {
            if ((it.e1 === entity && it.ny > 0) || (it.e2 === entity && it.ny < 0)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get under entity
     * @param {Entity} entity Target entity
     */
    static getUnderEntity(entity) {
        let list = entity.collider.collisions;
        for (let it of list) {
            if ((it.e1 === entity && it.ny > 0) || (it.e2 === entity && it.ny < 0)) {
                return this.getCollidedEntity(entity, it);
            }
        }
    }

    /**
     * Get collided entity
     * @param {Entity} entity Target entity
     */
    static getSideEntity(entity) {
        let list = entity.collider.collisions;
        for (let it of list) {
            if (it.ny != 0) {
                continue;
            }
            let dot = entity.body.preVelocityX * it.nx + entity.body.preVelocityY * it.ny;
            if ((it.e1 === entity && dot > 0) || (it.e2 === entity && dot < 0)) {
                return this.getCollidedEntity(entity, it);
            }
        }
    }

    /**
     * Get entity from collision data
     * @param {Entity} self Entity itself
     * @param {CollisionData} data Collision data
     * @return {Entity} Collided entity
     */
    static getCollidedEntity(self, data) {
        return data.e1 === self ? data.e2 : data.e1;
    }
}
