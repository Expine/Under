/**
 * Base state for rendering state animation
 * Renders animation according to direction
 * @implements {State}
 * @classdesc Base state for rendering state animation
 */
class BaseState extends State { // eslint-disable-line  no-unused-vars
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
     * Set state animation
     * @param {NamedAnimation} stateAnimation State animation
     */
    setStateAnimaton(stateAnimation) {
        this.stateAnimation = stateAnimation;
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
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.stateAnimation !== null) {
            // set direction
            this.stateAnimation.setName(`${this.entity.directionX}-${this.entity.directionY}`);
            // render
            this.stateAnimation.render(ctx, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
        }
    }
}
