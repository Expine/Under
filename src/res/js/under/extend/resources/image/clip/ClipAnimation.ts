import { DelegateAnimation } from "../delegate/DelegateAnimation";
import { isIClipImage } from "../../../../base/resources/image/IClipImage";

/**
 * Clip animation
 * - Renders by cliping
 * @extends {DelegateAnimation}
 * @classdesc Clip animation to render by cliping
 */
export class ClipAnimation extends DelegateAnimation {
    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipHeight Cliping height
     */
    setClipArea(clipX: number, clipY: number, clipWidth: number, clipHeight: number) {
        for (const it of this.getImages()) {
            if (isIClipImage(it)) {
                it.setClipArea(clipX, clipY, clipWidth, clipHeight);
            }
        }
    }
}
