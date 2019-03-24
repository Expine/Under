import { DelegateAnimation } from "../delegate/DelegateAnimation";
import { IDirectionalImage, isIDirectionalImage } from "../../../../base/resources/image/IDirectionalImage";

/**
 * Directional animation
 * - Render animation considering the direction
 * @extends {DelegateAnimation}
 * @implements {IDirectionalImage}
 * @classdesc Directional animation to render animation considering the direction
 */
export class DirectionalAnimation extends DelegateAnimation implements IDirectionalImage {
    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX: number, directionY: number) {
        for (const it of this.getImages()) {
            if (isIDirectionalImage(it)) {
                it.setDirection(directionX, directionY);
            }
        }
    }
}
