/**
 * Influential entity
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - ### It can be collided because it has material and collider
 * @interface
 * @implements {ImagedEntity}
 * @classdesc Influential entity that can be collided because it has material and collider
 */
class InfluentialEntity extends ImagedEntity { // eslint-disable-line  no-unused-vars
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
