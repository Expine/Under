/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - ### Show sign
 * @implements {ImagedEntity}
 * @classdesc Immutable event object to show sign
 */
class DoorObject extends ImagedEntity { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     * @param {string} [transition=null] Transition stage name
     * @param {boolean} [isReplace=false] Whether stage is replaced or not
     * @param {number} [popNumber=0] Number of applying pop
     */
    constructor(transition = null, isReplace = false, popNumber = 0) {
        super();

        /**
         * Whether transition is executing now or not
         * @protected
         * @type {boolean}
         */
        this.isTransitioning = false;

        /**
         * Transition stage name
         * @protected
         * @type {string}
         */
        this.transition = transition;
        /**
         * Whether stage is replaced or not
         * @protected
         * @type {boolean}
         */
        this.isReplace = isReplace;
        /**
         * Number of applying pop
         * @protected
         * @type {number}
         */
        this.popNumber = popNumber;

        /**
         * Door collider for
         * @protected
         * @type {Collider}
         */
        this.doorCollider = null;
    }

    /**
     * Set collider
     * @override
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.doorCollider = collider;
        this.doorCollider.setEntity(this);
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.doorCollider.init();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // opening
        if (this.isTransitioning) {
            super.update(dt);
            if (!(this.image instanceof GameAnimation) || this.image.isEnded()) {
                // transition
                Input.key.setInputEnable(true);
                for (let i = 0; i < this.popNumber; ++i) {
                    StageManager.it.popStage();
                }
                if (this.transition != null) {
                    if (this.isReplace) {
                        StageManager.it.replaceStage(this.transition);
                    } else {
                        StageManager.it.pushStage(this.transition);
                    }
                }
                this.isTransitioning = false;
            }
            return;
        }
        // open
        if (Input.it.isPress(Input.key.up())) {
            for (let it of this.stage.getPhysicalWorld().getCollisionData(this.doorCollider)) {
                let you = Util.getCollidedEntity(this, it);
                if (BaseUtil.implementsOf(you, IPlayable)) {
                    this.isTransitioning = true;
                    Input.key.setInputEnable(false);
                }
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);

        if (Engine.debug) {
            this.doorCollider.render(ctx, this.x + shiftX, this.y + shiftY);
        }
    }
}
