/**
 * Scene of editor
 * To make stage
 * @implements {Scene}
 * @classdesc scene of making stage
 */
class EditorScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Start scene
     * @override
     */
    start() {
        this.stage = (new CSVStageParser()).parse(`res/stage/test.map`, Screen.it.width, Screen.it.height);
        //        this.stage = new EditorStage(600, 600);
    }


    /**
     * Update scene
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        this.stage.update(dt);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        this.stage.render(ctx);
        let x = Math.floor(Input.it.getMouseX() / 32) * 32;
        let y = Math.floor(Input.it.getMouseY() / 32) * 32;
        ctx.strokeRect(x, y, 32, 32);
    }
}
