/**
 * Title Scene
 * @classdesc Title scene class
 */
class TitleScene extends Scene { // eslint-disable-line  no-unused-vars
    update(dt) {
        if (Input.it.isYesPress()) {
            this.scene.replaceScene(new GameScene());
        }
    }

    render(ctx) {
        ctx.fillText(`Press to Start`, 400, 300, 0.5);
    }
}
