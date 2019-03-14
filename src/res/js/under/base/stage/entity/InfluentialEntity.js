/**
 * Influential entity
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - ### It can be collided because it has material and collider
 * @interface
 * @extends {ImagedEntity}
 * @classdesc Influential entity that can be collided because it has material and collider
 */
class InfluentialEntity extends ImagedEntity {
    /**
     * Influential entity constructor
     * @constructor
     */
    constructor() {
        super();

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
     * Set material
     * @param {Material} material Material information
     */
    setMaterial(material) {
        this.material = material;
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
}
