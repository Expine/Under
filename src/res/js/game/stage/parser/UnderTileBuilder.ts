import { TileBuilder } from "../../../under/extend/stage/parser/TileBuilder";
import { Collider } from "../../../under/base/stage/physics/collider/Collider";
import { ExcludedRectangleCollider } from "../physics/collider/ExcludedRectangleCollider";
import { ExcludedRoundRectangleCollider } from "../physics/collider/ExcludedRoundRectangleCollider";
import { Entity } from "../../../under/base/stage/entity/Entity";
import { UnderTileObject } from "../entity/UnderTileObject";

/**
 * Under tile builder
 * - Generates unique tile object
 * @extends {TileBuilder}
 * @classdesc Under tile builder to generates unique tile object
 */
export class UnderTileBuilder extends TileBuilder {
    /**
     * Make base collider
     * @protected
     * @param {any} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider: any): Collider | null {
        if (collider !== undefined && collider.excluded) {
            switch (collider.type) {
                case 'Rectangle':
                    return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                case 'RoundRectangle':
                    return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
            }
        }
        return super.makeCollider(collider);
    }

    /**
     * Make underlying tile object
     * @override
     * @protected
     * @param {any} deploy Entity deploy json data
     * @param {any} tile Tile information json data
     * @return {Entity} Underlying tile object
     */
    makeTileBase(deploy: any, tile: any): Entity | null {
        switch (tile.type) {
            case undefined:
                return new UnderTileObject(tile.terrain);
            default:
                return super.makeTileBase(deploy, tile);
        }
    }
}
