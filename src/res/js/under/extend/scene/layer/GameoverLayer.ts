import { Layer } from "../../../base/scene/layer/Layer";
import { Context } from "../../../base/resources/image/Context";

/**
 * Gameover layer
 * - Performs drawing processing collectively
 * - ### Display gameover
 * @extends {Layer}
 * @classdesc Gameover layer to display gamover
 */
export class GameoverLayer extends Layer {
    /**
     * Initialize scene
     * @override
     */
    init() { }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        ctx.fillText(`Gameover`, this.x + this.width / 2, this.y + this.height / 2, 0.5, 0.5, 100, 'red');
    }
}
