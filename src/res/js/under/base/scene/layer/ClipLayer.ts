import { Layer } from "./Layer";

/**
 * Clip layer
 * - Clips area when rendering
 * @abstract
 * @extends {Layer}
 * @classdesc Clip layer to clip area when rendering
 */
export abstract class ClipLayer extends Layer {
    /**
     * Clip x position
     * @protected
     * @type {number}
     */
    protected clipX: number;
    /**
     * Clip y position
     * @protected
     * @type {number}
     */
    protected clipY: number;
    /**
     * Clip width
     * @protected
     * @type {number}
     */
    protected clipWidth: number;
    /**
     * Clip height
     * @protected
     * @type {number}
     */
    protected clipHeight: number;

    /**
     * Clip layer constructor
     * @constructo
     */
    constructor() {
        super();

        this.clipX = 0;
        this.clipY = 0;
        this.clipWidth = 0;
        this.clipHeight = 0;
    }

    /**
     * Clip area
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipHeight Cliping height
     */
    clip(clipX: number, clipY: number, clipWidth: number, clipHeight: number) {
        this.clipX = clipX;
        this.clipY = clipY;
        this.clipWidth = clipWidth;
        this.clipHeight = clipHeight;
    }
}
