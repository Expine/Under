/**
 * Respawn entity
 * - Object present on the stage that has coordinate and size
 * - ### Generate some entity
 * @interface
 * @extends {Entity}
 * @classdesc Respawn entity to generate some entity
 */
class RespawnEntity extends Entity {
    /**
     * Generates entity and add to stage
     * @abstract
     * @protected
     * @return {Entity} Generated entity
     */
    createRespawnEntity() {}

    /**
     * Try to respawn entity
     * @param {number} dt Delta time
     * @return {Entity} Generated entity
     */
    tryRespawn(dt) {
        return this.createRespawnEntity();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.tryRespawn(dt);
    }
}
