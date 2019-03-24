import { Entity } from "../../../../base/stage/entity/Entity";

/**
 * Respawn entity
 * - Generate some entity
 * @abstract
 * @extends {Entity}
 * @classdesc Respawn entity to generate some entity
 */
export abstract class RespawnEntity extends Entity {
    /**
     * Generates entity and add to stage
     * @abstract
     * @protected
     * @return {Entity} Generated entity
     */
    protected abstract createRespawnEntity(): Entity | null;

    /**
     * Try to respawn entity
     * @param {number} dt Delta time
     * @return {Entity} Generated entity
     */
    tryRespawn(_dt: number): Entity | null {
        return this.createRespawnEntity();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        this.tryRespawn(dt);
    }
}

/**
 * Type guard for RespawnEntity
 */
export const isRespawnEntity = (arg: any): arg is RespawnEntity => arg !== null && arg instanceof RespawnEntity;
