/**
 * Base State
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - ### Base state for rendering state animation
 * @implements {State}
 * @implements {IAnimationable}
 * @classdesc Base state for rendering state animation
 */
class BaseState extends State /* IAnimationable */ { // eslint-disable-line  no-unused-vars
    /**
     * Base state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * State animation
         * @protected
         * @type {NamedAnimation}
         */
        this.stateAnimation = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (this.stateAnimation !== null) {
            this.stateAnimation.init();
        }
    }


    /**
     * Set animation
     * @override
     * @param {Animation} animation Animation
     */
    setAnimation(animation) {
        this.stateAnimation = animation;
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.stateAnimation !== null) {
            this.stateAnimation.update(dt);
        }
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.stateAnimation !== null) {
            // render
            this.stateAnimation.render(ctx, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width * this.entity.directionX, this.entity.height);
        }
    }
}
