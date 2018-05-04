/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - ### Fire event
 * @implements {Entity}
 * @classdesc Immutable event object to fire event
 */
class ImmutableEvent extends Entity /* IEventEntity */ { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Event for firing
         * @protected
         * @type {StageEvent}
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
     * Set collider
     * @override
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.eventCollider = collider;
        this.eventCollider.setEntity(this);
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
        EventManager.register.register(this.event);
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.eventCollider.init();
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

    /**
     * Render entity
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        if (Engine.debug) {
            this.eventCollider.render(ctx, shiftX, shiftY);
        }
    }
}
