/**
 * Character
 * Manages AI by list
 * And can be damaged and destroyed
 * @implements {SingleAIObject}
 * @implements {Damagable}
 * @classdesc Character that can be damaged and destroyed
 */
class Character extends SingleAIObject /* , Damagable */ { // eslint-disable-line  no-unused-vars
    /**
     * Character constructor
     * @constructor
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} [imageID=-1] image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

        /**
         * Hit point
         * @protected
         * @type {number}
         */
        this.hp = 0;
    }

    /**
     * Get hit point
     * @override
     * @return {number} Hit point
     */
    getHP() {
        return this.hp;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.destroy();
        }
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
    }
}
