import { ResourceID } from './../../base/resources/IResourceManager';
import { InfluentialEntity } from "../../base/stage/entity/InfluentialEntity";
import { CollisionData } from "../../base/stage/physics/collider/CollisionData";
import { Context } from "../../base/resources/image/Context";
import { ResourceManager } from "../../base/resources/ResourceManager";
import { GameAnimation } from '../../base/resources/image/GameAnimation';
import { MutableEntity } from '../../base/stage/entity/MutableEntity';
import { GameImage } from '../../base/resources/image/GameImage';

/**
 * Convenient method group
 * @classdesc Convenient method group
 */
export class Util {
    /**
     * Determine whether entity is on the ground
     * @param {InfluentialEntity} entity Target entity
     * @return {boolean} Whether entity is on the ground
     */
    static onGround(entity: InfluentialEntity): boolean {
        return this.getUnderEntity(entity) !== null;
    }

    /**
     * Get under entity
     * @param {InfluentialEntity} entity Target entity
     * @return {InfluentialEntity} Under entity (if not, return null)
     */
    static getUnderEntity(entity: InfluentialEntity): InfluentialEntity | null {
        if (entity.collider === null) {
            return null;
        }
        const data = entity.collider.collisions.find((it) => {
            return it.colliding.collider !== null && it.collided.collider !== null && ((it.colliding === entity && it.ny > 0) || (it.collided === entity && it.ny < 0)) && it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider);
        });
        return data === undefined ? null : this.getCollidedEntity(entity, data);
    }

    /**
     * Get collided entity
     * @param {MutableEntity} entity Target entity
     * @return {InfluentialEntity} Under entity (if not, return null)
     */
    static getSideEntity(entity: MutableEntity): InfluentialEntity | null {
        if (entity.collider === null || entity.body === null) {
            return null;
        }
        const list = entity.collider.collisions;
        for (const it of list) {
            if (it.ny !== 0) {
                continue;
            }
            if (this.isCollidedWithDirection(it, entity, entity.body.velocityX, entity.body.velocityY)) {
                return this.getCollidedEntity(entity, it);
            }
        }
        return null;
    }

    /**
     * Get entity from collision data
     * @param {InfluentialEntity} self Entity itself
     * @param {CollisionData} data Collision data
     * @return {InfluentialEntity} Collided entity
     */
    static getCollidedEntity(self: InfluentialEntity, data: CollisionData): InfluentialEntity {
        return data.colliding === self ? data.collided : data.colliding;
    }

    /**
     * Load text file
     * @param {string} filePath File path
     * @return {string} Loaded text
     */
    static loadFile(filePath: string): string {
        const req = new XMLHttpRequest();
        req.open(`GET`, filePath, false);
        req.send(null);
        return req.responseText;
    }

    /**
     * Renders window
     * @param {Context} ctx Canvas context
     * @param {ResourceID} id Window image ID
     * @param {number} x Window x position
     * @param {number} y Window x position
     * @param {number} width Window width
     * @param {number} height Window height
     */
    static renderWindow(ctx: Context, id: ResourceID, x: number, y: number, width: number, height: number) {
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
    static canEnd(image: GameImage): boolean {
        return !(image instanceof GameAnimation) || image.isEnded();
    }

    /**
     * Remove element from list if element exists
     * @param {Array<?>} list Tartget list
     * @param {?} element Target  element
     * @return {number} Index of element if it exists
     */
    static removeIfExists(list: Array<any>, element: any): number {
        const index = list.indexOf(element);
        if (index >= 0) {
            list.splice(index, 1);
        }
        return index;
    }

    /**
     * Parse json string to object
     * @param construct Constructor of target object
     * @param json Json text
     * @return Assigned object
     */
    static parseJson<T>(construct: () => T, json: string): T {
        return Object.assign(construct(), JSON.parse(json));
    }

    /**
     * Determine if there is a collision considering the x-direction
     * @param data Collision data to use
     * @param target Target entity with direction
     * @param directionX X-direction
     */
    static isCollidedWithXDirection(data: CollisionData, target: InfluentialEntity, directionX: number) {
        return (data.colliding === target && data.nx * directionX > 0) || (data.collided === target && data.nx * directionX < 0)
    }

    /**
     * Determine if there is a collision considering the x-direction
     * @param data Collision data to use
     * @param target Target entity with direction
     * @param directionY Y-direction
     */
    static isCollidedWithYDirection(data: CollisionData, target: InfluentialEntity, directionY: number) {
        return (data.colliding === target && data.ny * directionY > 0) || (data.collided === target && data.ny * directionY < 0)
    }

    /**
     * Determine if there is a collision considering the direction
     * @param data Collision data to use
     * @param target Target entity with direction
     * @param directionX X-direction
     * @param directionY Y-direction
     */
    static isCollidedWithDirection(data: CollisionData, target: InfluentialEntity, directionX: number, directionY: number) {
        return (data.colliding === target && data.nx * directionX + data.ny * directionY > 0) || (data.collided === target && data.nx * directionX + data.ny * directionY < 0)
    }
}
