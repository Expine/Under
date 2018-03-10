/**
 * Attack object
 * Object indicating attack
 * @implements {SingleAIObject}
 * @classdesc Attack object indicating attack
 */
class AttackObject extends SingleAIObject { // eslint-disable-line  no-unused-vars
    /**
     * Attack object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} [imageID=-1] image ID for rendering (if has not, -1)
     * @param {number} [lifespan=0] Lifespan of attack object
     */
    constructor(x, y, width, height, imageID = -1, lifespan = 0) {
        super(x, y, width, height, imageID);

        /**
         * Lifespan of attack object
         * @type {number}
         */
        this.lifespan = lifespan;
    }

    /**
     * Check collisions and process if the object collides
     * @interface
     */
    judgeCollision() {}

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        this.lifespan -= dt;
        if (this.lifespan < 0) {
            this.destroy();
            return;
        }
        this.judgeCollision();
        super.update(dt);
    }
}
