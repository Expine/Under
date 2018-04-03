/**
 * Hook object
 * @implements {SpecialObject}
 * @implements {Hookable}
 * @classdesc Hook object
 */
class HookObject extends SpecialObject /* , Hookable */ { // eslint-disable-line  no-unused-vars
    /**
     * Hook object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {Entity} entity Attacker entity
     */
    constructor(x, y, width, height, entity) {
        super(x, y, width, height, entity, -1);

        // set base data
        let imageID = ContextImage.it.loadImage(`chara/hook.png`);
        let anime = new SingleAnimation();
        anime.addAnimation(new AnimationElement(imageID, 0, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 32, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 64, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 96, 0, 32, 32, 100));
        this.setAnimation(anime);
        this.setCollider(new DirectionalRectangleCollider((23 - 8) * this.width / 32, (10 - 2) * this.height / 32, 10 * this.width / 32, 10 * this.height / 32));
        this.setMaterial(new DefaultMaterial());
        this.setRigidBody(new PreciseBody());
        this.addAI(new HookStateAI(entity));
    }

    /**
     * Get actor who it belongs to
     * @override
     * @return {Entity} Actor who it belongs to
     */
    getActor() {
        return this.entity;
    }

    /**
     * Release hook
     * @override
     */
    release() {
        for (let it of this.ai) {
            if (it instanceof StateAI) {
                it.changeState(`released`);
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        this.width *= this.directionX;
        this.height *= -this.directionY;
        super.render(ctx, shiftX, shiftY);
        this.width *= this.directionX;
        this.height *= -this.directionY;
    }
}
