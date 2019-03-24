import { DelegateNamedAnimation } from "../delegate/DelegateNamedAnimation";
import { IDirectionalImage, isIDirectionalImage } from "../../../../base/resources/image/IDirectionalImage";

/**
 * Directional named animation
 * - Render animation considering the direction
 * @extends {DelegateNamedAnimation}
 * @implements {IDirectionalImage}
 * @classdesc Directional named animation to render animation considering the direction
 */
export class DirectionalNamedAnimation extends DelegateNamedAnimation implements IDirectionalImage {
    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX: number, directionY: number) {
        for (const it of this.getAnimations()) {
            if (isIDirectionalImage(it)) {
                it.setDirection(directionX, directionY);
            }
        }
    }
}
