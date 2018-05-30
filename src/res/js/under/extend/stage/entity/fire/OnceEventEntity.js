/**
 * Once event entity
 * - Object present on the stage that has coordinate and size
 * - It can hold event and fire it
 * - Object that has collide
 * - Fire event
 * - Object that can be destroyed
 * - ### Fire event once
 * @extends {ImmutableEvent}
 * @implements {IEventEntity}
 * @implements {IColliderable}
 * @classdesc Once event entity to fire event
 */
class OnceEventEntity extends ImmutableEvent /* , IBreakable */ { // eslint-disable-line  no-unused-vars
    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
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
        this.destroy();
    }
}
