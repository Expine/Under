import { MaxAdoptBody } from "./MaxAdoptBody";

/**
 * Fix body
 * - It is fixed state unless it is moving
 * @extends {MaxAdoptBody}
 * @classdesc Fix body that is fixed state unless it is moving
 */
export class FixBody extends MaxAdoptBody {
    /**
     * Whether to apply reflection only to the object
     * @override
     * @return {boolean} Whether to apply reflection only to the object
     */
    isFixed(): boolean {
        return this.fixed && Math.abs(this.diffX) < 5 && Math.abs(this.diffY) < 5;
    }
}
