import { GameImage } from "../../resources/image/GameImage";

/**
 * Image builder
 * - Generates image from json data
 * @abstract
 * @classdesc Image builder to generate image from json
 */
export abstract class ImageBuilder {
    /**
     * Build image from json data
     * @abstract
     * @param {string} root File root path
     * @param {any} image Image json data
     * @return {GameImage} image
     */
    abstract build(root: string, image: any): GameImage | null;
}
