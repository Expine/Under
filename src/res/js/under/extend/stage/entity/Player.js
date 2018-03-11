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

        this.addAI(new BaseStateAI(this, new PStationaryState()));

        this.hp = 3;

        /**
         * Direction of player
         */
        this.direction = 1;

        /**
         * Remaining time of invincible state
         * @type {number}
         */
        this.invincible_ = 0;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        if (this.invincible_ == 0) {
            this.hp -= damage;
            this.invincible_ = 1000;
        }
        if (this.hp <= 0) {}
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
        if (this.invincible_ % 2 == 0) {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
