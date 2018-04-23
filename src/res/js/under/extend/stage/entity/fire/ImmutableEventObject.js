/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is fixed and no change will occur
 * - It can hold event and fire it
 * - ### Fire event
 * @implements {ImmutableEntity}
 * @classdesc Immutable event object to fire event
 */
class ImmutableEventObject extends ImmutableEntity /* IEventEntity */ { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {number} [imageID=-1] Image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

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
    }

    /**
     * Set collider
     * @override
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        super.setCollider(collider);
        collider.response = false;
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
        if (this.event instanceof StageEvent) {
            this.event.setStage(this.stage);
        }
        EventManager.exec.execute(this.event);
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        let localCollided = false;
        for (let it of this.collider.collisions) {
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
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.imageID != -1) {
            ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY, this.width, this.height);
        }
    }
}
