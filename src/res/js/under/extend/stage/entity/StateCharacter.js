/**
 * State character
 * Entity that manages AI according to state
 * Also manage drawing with AIState
 * @implements {AutonomyObject}
 * @classdesc Entity that manages AI according to state
 */
class StateCharacter extends SingleAIObject { // eslint-disable-line  no-unused-vars
    /**
     * State character constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

        /**
         * State of character
         * @protected
         * @type {State}
         */
        this.state = null;
    }

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        for (let it of this.ai) {
            if (it.apply(dt)) {
                this.state = it.getState();
                break;
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.state != null) {
            this.state.render(ctx, shiftX, shiftY);
        }

        // For debug to render collider
        if (this.collider !== undefined) {
            this.collider.render(ctx, shiftX, shiftY);
        }
    }
}
