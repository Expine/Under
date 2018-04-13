/**
 * Influential entity
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - ### It can be collided because it has material and collider
 * @implements {ImagedEntity}
 * @classdesc Influential entity that can be collided because it has material and collider
 */
class InfluentialEntity extends ImagedEntity { // eslint-disable-line  no-unused-vars
    /**
     * Influential entity constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {number} imageID Image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

        /**
         * Material inofrmation
         * @type {Material}
         */
        this.material = null;
        /**
         * Entity collider
         * @type {Collider}
         */
        this.collider = null;
    }

    /**
     * Set collider
     * @param {Collider} collider Entity collider
     */
    setCollider(collider) {
        this.collider = collider;
        // initialize
        collider.setEntity(this);
        collider.init();
    }

    /**
     * Set material
     * @param {Material} material Material information
     */
    setMaterial(material) {
        this.material = material;
    }
}
