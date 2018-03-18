/**
 * Player object
 * Entities operated by the player
 * @implements {StateCharacter}
 * @classdesc Player object to operate by input
 */
class Player extends StateCharacter { // eslint-disable-line  no-unused-vars
    /**
     * Player constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering
     */
    constructor(x, y, width, height, imageID) {
        super(x, y, width, height, imageID);

        this.hp = 3;
        this.addAI(new PlayerBaseStateAI(this));

        /**
         * Remaining time of invincible state
         * @type {number}
         */
        this.invincible_ = 0;

        /**
         * State animation dictionary
         * @type {Dictionary<string, StateAnimationList>}
         */
        this.stateAnimations = {};
    }

    /**
     * Add state animation by name
     * @param {string} name State name
     * @param {number} dirX X direction
     * @param {number} dirY Y direction
     * @param {StateAnimationList} animation State animation
     */
    addStateAnimation(name, dirX, dirY, animation) {
        this.stateAnimations[`${name}(${dirX},${dirY})`] = animation;
    }

    /**
     * Get state animation by name
     * @override
     * @return {StateAnimationList} State animation
     */
    getStateAnimation(name) {
        return this.stateAnimations[`${name}(${this.directionX},${this.directionY})`];
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        if (this.invincible_ == 0 && this.hp > 0) {
            this.hp -= damage;
            this.invincible_ = 1000;
        }
    }

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        this.invincible_ -= dt;
        if (this.invincible_ <= 0) {
            this.invincible_ = 0;
        }
        super.update(dt);
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.invincible_ % 2 == 0 || this.hp <= 0) {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
