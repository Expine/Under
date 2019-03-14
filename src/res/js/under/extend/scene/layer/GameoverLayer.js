/**
 * Gameover layer
 * - Performs drawing processing collectively
 * - ### Display gameover
 * @extends {Layer}
 * @classdesc Gameover layer to display gamover
 */
class GameoverLayer extends Layer {
    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        ctx.fillText(`Gameover`, this.x + this.width / 2, this.y + this.height / 2, 0.5, 0.5, 100, `red`);
    }
}
