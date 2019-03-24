/**
 * Clip image interface
 * - Clips area when rendering
 * @interface
 * @classdesc Clip image interface to clip area when rendering
 */
export interface IClipImage {
    /**
     * Set clipingArea
     * @abstract
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipHeight Cliping height
     */
    setClipArea(clipX: number, clipY: number, clipWidth: number, clipHeight: number): void;
}

/**
 * Type guard for IClipImage
 */
export const isIClipImage = (arg: any): arg is IClipImage => arg !== null && arg.setClipArea !== undefined;
