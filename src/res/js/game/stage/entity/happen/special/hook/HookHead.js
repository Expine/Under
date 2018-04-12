/**
 * Hook head object
 * @implements {HookObject}
 * @classdesc Hook object
 */
class HookHead extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook head object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {Entity} entity Attacker entity
     * @param {number} length Hook length
     * @param {number} restLength Hook rest length
     */
    constructor(x, y, width, height, entity, length, restLength) {
        super(x, y, width, height, entity, null, length, restLength);

        // set base data
        let imageID = ResourceManager.image.load(`chara/hook.png`);
        let anime = new SingleAnimation();
        anime.addAnimation(new AnimationElement(imageID, 0, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 32, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 64, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 96, 0, 32, 32, 100));
        this.setAnimation(anime);
        this.setCollider(new DirectionalRectangleCollider((23 - 8) * this.width / 32, (10 - 2) * this.height / 32, 10 * this.width / 32, 10 * this.height / 32));
        this.setMaterial(new DefaultMaterial());
        this.setRigidBody(new PreciseBody());
        this.addAI(new HeadHookStateAI(this, entity));

        this.directionX = entity.directionX;
        this.directionY = -1;
        this.x -= (this.getHookX() - this.x);
        this.y -= (this.getHookY() - this.y);
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX() {
        if (this.directionX >= 0) {
            return this.x + 5 * this.width / 32;
        } else {
            return this.x + this.width - 5 * this.width / 32;
        }
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY() {
        if (this.directionY <= 0) {
            return this.y + this.height - 5 * this.height / 32;
        } else {
            return this.y + 5 * this.height / 32;
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        this.width *= this.directionX;
        this.height *= -this.directionY;
        super.render(ctx, shiftX, shiftY);
        this.width *= this.directionX;
        this.height *= -this.directionY;
        // head to child line
        if (this.previous !== null) {
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, this.previous.getHookX() + shiftX, this.previous.getHookY() + shiftY, `red`, 2);
        } else {
            let x = this.entity.directionX >= 0 ? this.generatedX + this.entity.x + this.entity.width : this.entity.x - this.generatedX;
            let y = this.entity.y - this.generatedY;
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, x + shiftX, y + shiftY, `red`, 2);
        }
    }
}
