/**
 * Straight AI
 * AI to go straight ahead
 * @implements {AI}
 * @classdesc Straight AI to go straight ahead
 */
class StraightAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Straight AI Constructor
     * @constructor
     * @param {Entity} entity Entity to which AI is attached
     */
    constructor(entity) {
        super(entity);

        this.switcher = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.switcher += dt;
        if (this.switcher > 10 * 1000) {
            this.switcher = 0;
        }
        let it = 300;
        this.entity.body.velocityX = 0;
        if (this.switcher > 5000) {
            if (this.entity.body.velocityX > -it) {
                this.entity.body.enforce(-it * 10, 0);
            } else {
                this.entity.body.velocityX = -it;
            }
        } else {
            if (this.entity.body.velocityX < it) {
                this.entity.body.enforce(it * 10, 0);
            } else {
                this.entity.body.velocityX = it;
            }
        }
        return true;
    }
}
