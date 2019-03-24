import { ImageBuilder } from "./ImageBuilder";
import { Entity } from "../entity/Entity";

/**
 * Entity builder
 * - Generates entity from json data
 * @abstract
 * @classdesc Entity builder to generate entity
 */
export abstract class EntityBuilder {
    /**
     * Image  builder for building event
     * @type {ImageBuilder}
     */
    imageBuilder: ImageBuilder | null;

    /**
     * Entity builder constructor
     * @constructor
     */
    constructor() {
        this.imageBuilder = null;
    }

    /**
     * Set image builder
     * @param {ImageBuilder} image Image builder
     */
    setImageBuilder(image: ImageBuilder) {
        this.imageBuilder = image;
    }

    /**
     * Build entity from json data
     * @abstract
     * @param {any} deploy Entity deploy json data
     * @param {any} json Entity json data
     * @return {Entity} Generated entity
     */
    abstract build(deploy: any, json: any): Entity | null;
}
