import { Material } from "../physics/material/Material";
import { ImagedEntity } from "./ImagedEntity";
import { Collider } from "../physics/collider/Collider";

/**
 * Influential entity
 * - It can be collided because it has material and collider
 * @abstract
 * @extends {ImagedEntity}
 * @classdesc Influential entity that can be collided because it has material and collider
 */
export abstract class InfluentialEntity extends ImagedEntity {
    /**
     * Material inofrmation
     * @type {Material}
     */
    material: Material | null;
    /**
     * Entity collider
     * @type {Collider}
     */
    collider: Collider | null;

    /**
     * Influential entity constructor
     * @constructor
     */
    constructor() {
        super();

        this.material = null;
        this.collider = null;
    }

    /**
     * Set material
     * @param {Material} material Material information
     */
    setMaterial(material: Material) {
        this.material = material;
    }

    /**
     * Set collider
     * @param {Collider} collider Entity collider
     */
    setCollider(collider: Collider) {
        this.collider = collider;
        // initialize
        collider.setEntity(this);
        collider.init();
    }
}
