/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - Enable to set animation
 * - ### Show sign
 * @implements {ImagedEntity}
 * @implements {IAnimationable}
 * @classdesc Immutable event object to show sign
 */
class DoorObject extends ImagedEntity /* , IAnimationable */ { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     * @param {string} transition Transition stage name
     * @param {boolean} isReplace Whether stage is replaced or not
     */
    constructor(transition, isReplace) {
        super();

        /**
         * Set door animation
         * @protected
         * @param {Animation}
         */
        this.doorAnimation = null;
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
         * Door collider for
         * @protected
         * @type {Collider}
         */
        this.doorCollider = null;
    }

    /**
     * Set animation
     * @override
     * @param {Animation} animation Animation
     */
    setAnimation(animation) {
        this.doorAnimation = animation;
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
            this.doorAnimation.update(dt);
            if (this.doorAnimation.isEnded()) {
                // transition
                Input.key.setInputEnable(true);
                if (this.isReplace) {
                    StageManager.it.replaceStage(this.transition);
                } else {
                    StageManager.it.pushStage(this.transition);
                }
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
        if (this.doorAnimation != null) {
            this.doorAnimation.render(ctx, this.x + shiftX, this.y + shiftY, this.width, this.height);

            if (Engine.debug) {
                this.doorCollider.render(ctx, this.x + shiftX, this.y + shiftY);
            }
        } else {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
