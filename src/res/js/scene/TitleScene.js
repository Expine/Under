/**
 * Title Scene
 * @classdesc Title scene class
 */
class TitleScene extends Scene { // eslint-disable-line  no-unused-vars
    start() {
        this.title = Context.image.loadImage(`res/image/ui/title.png`);
    }

    update(dt) {
        if (Input.it.isAnyKeyPress()) {
            this.scene.replaceScene(new GameScene());
        }
    }

    render(ctx) {
        ctx.drawImage(this.title, 215, 240, 370, 120);
    }
}
