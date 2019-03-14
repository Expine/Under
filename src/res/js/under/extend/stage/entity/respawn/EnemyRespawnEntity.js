/**
 * Enemy respawn entity
 * - Object present on the stage that has coordinate and size
 * - Generate some entity
 * - ### Generates enemy
 * @extends {RespawnEntity}
 * @classdesc Enemy respawn entity to generate enemy
 */
class EnemyRespawnEntity extends RespawnEntity {
    /**
     * Enemy respawn Entity
     * @constructor
     * @param {number} respawnInterval Interval of respawning entity
     * @param {number} respawnMax Max number of respawning entity
     */
    constructor(respawnInterval, respawnMax) {
        super();

        /**
         * Interval of respawning entity
         * @protected
         * @type {number}
         */
        this.respawnInterval = respawnInterval;
        /**
         * Max number of respawning entity
         * @protected
         * @type {number}
         */
        this.respawnMax = respawnMax;

        /**
         * Respawn entity ID list
         * @protected
         * @type {Array<number>}
         */
        this.respawnIDs = [];

        /**
         * Respawned entity list
         * @protected
         * @type {Array<Entity>}
         */
        this.respawnEnemies = [];
        /**
         * Respawn counter
         * @protected
         * @type {number}
         */
        this.respawnCount = 0;
    }

    /**
     * Add enemy ID for respawn
     * @param {number} id Respawning enemy ID
     */
    addEnemyID(id) {
        this.respawnIDs.push(id);
    }

    /**
     * Generates entity and add to stage
     * @override
     * @protected
     * @return {Entity} Generated entity
     */
    createRespawnEntity() {
        if (this.respawnIDs.length > 0) {
            const ret = this.stage.addEntityByID(this.respawnIDs[Math.floor(this.respawnIDs.length * Math.random())], {
                x: this.x,
                y: this.y,
                z: this.z,
            });
            this.respawnEnemies.push(ret);
            return ret;
        }
        return null;
    }

    /**
     * Try to respawn entity
     * @override
     * @return {Entity} Generated entity
     * @param {number} dt Delta time
     * @return {Entity} Generated entity
     */
    tryRespawn(dt) {
        this.respawnCount += dt / 1000;
        if (this.respawnCount > this.respawnInterval) {
            this.respawnCount -= this.respawnInterval;
            // check remove
            const removeList = [];
            for (const enemy of this.respawnEnemies) {
                if (!this.stage.getEntities().some((it) => it === enemy)) {
                    removeList.push(enemy);
                }
            }
            for (const it of removeList) {
                this.respawnEnemies.splice(this.respawnEnemies.indexOf(it), 1);
            }
            // check limit
            if (this.respawnEnemies.length < this.respawnMax) {
                return super.tryRespawn(dt);
            }
        }
        return null;
    }
}
