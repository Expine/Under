/**
 * Base state for rendering state animation
 * @implements {State}
 * @classdesc Base state for rendering state animation
 */
class BaseState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Base state constructor
     * @constructor
     * @param {string} name State name
     */
    constructor(name) {
        super();

        /**
         * State name
         * @private
         * @type {string}
         */
        this.name_ = name;
    }

    /**
     * Update state
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.stateAnimation !== undefined) {
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
        if (this.stateAnimation !== undefined) {
            // set name
            if (this.stateAnimation instanceof NamedAnimation) {
                this.stateAnimation.setName(this.name_);
            }
            // render
            this.stateAnimation.render(ctx, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
        }
    }
}
