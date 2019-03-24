import { GameEvent } from "../common/GameEvent";
import { ImageBuilder } from "../../stage/parser/ImageBuilder";

/**
 * Event builder
 * - Generates event from json data
 * @abstract
 * @classdesc Event builder to generate event
 */
export abstract class EventBuilder {
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
     * Build event from json data
     * @abstract
     * @param {any} json Event json data
     * @return {GameEvent} Generated event
     */
    abstract build(json: any): GameEvent | null;
}
