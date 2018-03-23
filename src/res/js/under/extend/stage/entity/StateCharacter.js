/**
 * State character
 * Entity that manages AI according to state
 * Also manage drawing with AIState
 * @implements {SingleAIObject}
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
     * Set animation base
     * @param {NamedAnimation} base Animation base
     */
    setAnimationBase(base) {
        /**
         * State animation
         * @protected
         * @type {NamedAnimation}
         */
        this.stateAnimation = base;
    }

    /**
     * Add state animation
     * @param {Animation} stateAnimation State animation
     * @param {number} [dirX=0] X dirction of animation
     * @param {number} [dirY=0] Y dirction of animation
     */
    addAnimation(stateAnimation, dirX = 0, dirY = 0) {
        this.stateAnimation.setName(`${dirX}-${dirY}`).setAnimation(stateAnimation);
    }

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        // set state animation
        this.stateAnimation.setName(`${this.directionX}-${this.directionY}`);
        // update AI
        for (let it of this.ai) {
            it.update(dt);
        }
        // apply AI
        for (let it of this.ai) {
            if (it.apply(dt)) {
                this.state = it.getState();
                this.state.setStateAnimaton(this.stateAnimation.getAnimation());
                break;
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
        if (this.state != null) {
            this.state.render(ctx, shiftX, shiftY);

            // For debug to render collider
            if (this.collider !== undefined) {
                this.collider.render(ctx, shiftX, shiftY);
            }
        } else {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
