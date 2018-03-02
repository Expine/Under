/**
 * Player AI
 * Operates by input
 * @implements {AI}
 * @classdesc Player AI to operate by input
 */
class PlayerAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Player AI Constructor
     * @constructor
     * @param {Entity} entity Entity to which AI is attached
     * @param {Input} input input system for getting player operation
     */
    constructor(entity, input) {
        super(entity);

        /**
         * input system for getting player operation
         * @type {Input}
         */
        this.input_ = input;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let ret = false;
        let it = 8;
        this.entity.body.velocityX = 0;
        if (this.input_.isUpPressed()) {
            this.entity.body.velocityY = -it;
            ret = true;
        }
        if (this.input_.isDownPressed()) {
            this.entity.body.velocityY = it;
            ret = true;
        }
        if (this.input_.isLeftPressed()) {
            this.entity.body.velocityX = -it;
            ret = true;
        }
        if (this.input_.isRightPressed()) {
            this.entity.body.velocityX = it;
            ret = true;
        }
        return ret;
    }
}
