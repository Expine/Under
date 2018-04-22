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

    /**
     * Renders window
     * @param {Context} ctx Canvas context
     * @param {number} id Window image ID
     * @param {number} x Window x position
     * @param {number} y Window x position
     * @param {number} width Window width
     * @param {number} height Window height
     */
    static renderWindow(ctx, id, x, y, width, height) {
        let imageWidth = ResourceManager.image.getWidth(id) / 3;
        let imageHeight = ResourceManager.image.getHeight(id) / 3;

        ctx.drawImage(id, x, y, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
        ctx.drawImage(id, x + imageWidth, y, width - imageWidth * 2, imageHeight, imageWidth, 0, imageWidth, imageHeight);
        ctx.drawImage(id, x + width - imageWidth, y, imageWidth, imageHeight, imageWidth * 2, 0, imageWidth, imageHeight);

        ctx.drawImage(id, x, y + imageHeight, imageWidth, height - imageHeight * 2, 0, imageHeight, imageWidth, imageHeight);
        ctx.drawImage(id, x + imageWidth, y + imageHeight, width - imageWidth * 2, height - imageHeight * 2, imageWidth, imageHeight, imageWidth, imageHeight);
        ctx.drawImage(id, x + width - imageWidth, y + imageHeight, imageWidth, height - imageHeight * 2, imageWidth * 2, imageHeight, imageWidth, imageHeight);

        ctx.drawImage(id, x, y + height - imageHeight, imageWidth, imageHeight, 0, imageHeight * 2, imageWidth, imageHeight);
        ctx.drawImage(id, x + imageWidth, y + height - imageHeight, width - imageWidth * 2, imageHeight, imageWidth, imageHeight * 2, imageWidth, imageHeight);
        ctx.drawImage(id, x + width - imageWidth, y + height - imageHeight, imageWidth, imageHeight, imageWidth * 2, imageHeight * 2, imageWidth, imageHeight);
    }
}
