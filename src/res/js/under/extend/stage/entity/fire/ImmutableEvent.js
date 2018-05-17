/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - It can hold event and fire it
 * - Object that has collide
 * - ### Fire event
 * @extends {Entity}
 * @implements {IEventEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to fire event
 */
class ImmutableEvent extends Entity /* , IEventEntity, IColliderable */ { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Event for firing
         * @protected
         * @type {GameEvent}
         */
        this.event = null;

        /**
         * Whether it has already collided
         * @@protected
         * @type {boolean}
         */
        this.collided = false;

        /**
         * Event collider for firing
         * @protected
         * @type {Collider}
         */
        this.eventCollider = null;
    }

    /**
     * Set game event
     * @override
     * @param {GameEvent} event Stage event
     */
    setEvent(event) {
        this.event = event;
    }

    /**
     * Get stage event
     * @override
     * @return {GameEvent} Stage event
     */
    getEvent() {
        return this.event;
    }

    /**
     * Fires event
     * @override
     */
    fire() {
        if (BaseUtil.implementsOf(this.event, IStageEvent)) {
            this.event.setStage(this.stage);
        }
        EventManager.it.register(this.event);
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.eventCollider = collider;
        this.eventCollider.setEntity(this);
        this.eventCollider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider() {
        return this.eventCollider;
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        let localCollided = false;
        for (let it of this.stage.getPhysicalWorld().getCollisionData(this.eventCollider)) {
            let you = Util.getCollidedEntity(this, it);
            if (BaseUtil.implementsOf(you, IPlayable)) {
                localCollided = true;
                if (!this.collided) {
                    this.fire();
                    break;
                }
            }
        }
        this.collided = localCollided;
    }
}
