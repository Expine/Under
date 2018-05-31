/**
 * Player respawn entity
 * - Object present on the stage that has coordinate and size
 * - Generate some entity
 * - Object that has collide
 * - ### Generates player
 * @extends {RespawnEntity}
 * @implements {IColliderable}
 * @classdesc Player respawn entity to generate player
 */
class PlayerRespawnEntity extends RespawnEntity /* , IColliderable */ { // eslint-disable-line  no-unused-vars
    /**
     * Player respawn Entity
     * @constructor
     * @param {number} playeriD Player ID
     * @param {number} priority Priority of respawning player
     */
    constructor(playerID, priority) {
        super();

        /**
         * Player ID
         * @protected
         * @type {number}
         */
        this.playerID = playerID;
        /**
         * Priority of respawning player
         * @protected
         * @type {number}
         */
        this.priority = priority;

        /**
         * Collider for registering
         * @protected
         * @type {Collider}
         */
        this.collider = null;

        /**
         * Registered respawn point
         * @protected
         * @type {boolean}
         */
        this.registered = false;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.collider = collider;
        this.collider.setEntity(this);
        this.collider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider() {
        return this.collider;
    }

    /**
     * Generates entity and add to stage
     * @override
     * @protected
     * @return {Entity} Generated entity
     */
    createRespawnEntity() {
        return this.stage.addEntityByID(this.playerID, {
            x: this.x,
            y: this.y,
            z: this.z,
            collider: {
                id: this.stage.getEntitiesByInterface(IPlayable).length,
            },
        });
    }

    /**
     * Try to respawn entity
     * @override
     * @param {number} dt Delta time
     * @return {Entity} Generated entity
     */
    tryRespawn(dt) {
        // check registered
        if (!this.registered) {
            return null;
        }
        // check other
        for (const other of this.stage.getEntitiesByInterface(PlayerRespawnEntity)) {
            if (other.registered && other.priority > this.priority) {
                return null;
            }
        }
        return super.tryRespawn(dt);
        this.createRespawnEntity();
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.collider.init();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // check registered
        if (this.registered) {
            return;
        }
        // judge to register
        for (const it of this.stage.getPhysicalWorld().getCollisionData(this.collider)) {
            if (BaseUtil.implementsOf(it.colliding, IPlayable)) {
                this.registered = true;
                break;
            }
        }
    }
}
