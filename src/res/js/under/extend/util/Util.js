/**
 * Convenient method group
 * @classdesc Convenient method group
 */
class Util { // eslint-disable-line  no-unused-vars
    /**
     * Determine whether entity is on the ground
     * @param {InfluentialEntity} entity Target entity
     * @return {boolean} Whether entity is on the ground
     */
    static onGround(entity) {
        return this.getUnderEntity(entity) !== null;
    }

    /**
     * Get under entity
     * @param {InfluentialEntity} entity Target entity
     * @return {InfluentialEntity} Under entity (if not, return null)
     */
    static getUnderEntity(entity) {
        const data = entity.collider.collisions.find((it) => {
            return ((it.colliding === entity && it.ny > 0) || (it.collided === entity && it.ny < 0)) && it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider);
        });
        return data === undefined ? null : this.getCollidedEntity(entity, data);
    }

    /**
     * Get collided entity
     * @param {InfluentialEntity} entity Target entity
     * @return {InfluentialEntity} Under entity (if not, return null)
     */
    static getSideEntity(entity) {
        const list = entity.collider.collisions;
        for (const it of list) {
            if (it.ny !== 0) {
                continue;
            }
            const dot = entity.body.velocityX * it.nx + entity.body.velocityY * it.ny;
            if ((it.colliding === entity && dot > 0) || (it.collided === entity && dot < 0)) {
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
        return data.colliding === self ? data.collided : data.colliding;
    }

    /**
     * Load text file
     * @param {string} filePath File path
     * @return {string} Loaded text
     */
    static loadFile(filePath) {
        const req = new XMLHttpRequest();
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
        const imageWidth = ResourceManager.image.getWidth(id) / 3;
        const imageHeight = ResourceManager.image.getHeight(id) / 3;
        x = Math.floor(x);
        y = Math.floor(y);
        width = Math.floor(width);
        height = Math.floor(height);

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

    /**
     * Whether it is not animation or animation is ended
     * @param {GameImage} image Target image
     * @return {boolean} Whether it is not animation or animation is ended
     */
    static canEnd(image) {
        return !(image instanceof GameAnimation) || image.isEnded();
    }

    /**
     * Remove element from list if element exists
     * @param {Array<?>} list Tartget list
     * @param {?} element Target  element
     * @return {number} Index of element if it exists
     */
    static removeIfExists(list, element) {
        const index = list.indexOf(element);
        if (index >= 0) {
            list.splice(index, 1);
        }
        return index;
    }
}
