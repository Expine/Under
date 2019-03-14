import { Context } from "../resources/image/Context";

/**
 * Scene
 * - Controls updating and rendering
 * @abstract
 * @classdesc Scene to control updating and rendering
 */
export abstract class Scene {
    /**
     * Initialize scene
     * @abstract
     */
    abstract init(): void;

    /**
     * Update scene
     * @abstract
     * @param {number} dt Delta time
     */
    abstract update(dt: number): void;

    /**
     * Render scene
     * @abstract
     * @param {Context} ctx Canvas context
     */
    abstract render(ctx: Context): void;
}
